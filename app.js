// Expense Tracker App
class ExpenseTracker {
    constructor() {
        this.expenses = this.loadExpenses();
        this.currentEditId = null;
        this.selectedMonth = 'all'; // Default to show all months
        this.initializeElements();
        this.populateMonthSelector();
        this.attachEventListeners();
        this.render();
        this.registerServiceWorker();
    }

    initializeElements() {
        // Form elements
        this.itemInput = document.getElementById('itemInput');
        this.costInput = document.getElementById('costInput');
        this.categorySelect = document.getElementById('categorySelect');
        this.addBtn = document.getElementById('addBtn');

        // Month selector elements
        this.monthSelect = document.getElementById('monthSelect');

        // Display elements
        this.totalAmount = document.getElementById('totalAmount');
        this.expenseList = document.getElementById('expenseList');
        this.emptyState = document.getElementById('emptyState');

        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editItemInput = document.getElementById('editItemInput');
        this.editCostInput = document.getElementById('editCostInput');
        this.editCategorySelect = document.getElementById('editCategorySelect');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
    }

    attachEventListeners() {
        // Add expense
        this.addBtn.addEventListener('click', () => this.addExpense());
        this.itemInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.costInput.focus();
        });
        this.costInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addExpense();
        });

        // Month selector
        this.monthSelect.addEventListener('change', (e) => {
            this.selectedMonth = e.target.value;
            this.render();
        });

        // Edit modal
        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.editModal.addEventListener('click', (e) => {
            if (e.target === this.editModal) this.closeModal();
        });
    }

    loadExpenses() {
        const stored = localStorage.getItem('expenses');
        return stored ? JSON.parse(stored) : [];
    }

    saveToStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    getCurrentMonthKey() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    }

    getMonthKey(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    }

    populateMonthSelector() {
        const months = [];

        // Add "Month" as default option
        months.push('<option value="all">Month</option>');

        // Generate months from November 2025 to December 2026
        const startDate = new Date(2025, 10, 1); // November 2025 (month is 0-indexed)
        const endDate = new Date(2026, 11, 1);   // December 2026

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const monthKey = this.getMonthKey(currentDate);
            const label = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });
            months.push(`<option value="${monthKey}">${label}</option>`);

            // Move to next month
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        // Populate dropdown
        this.monthSelect.innerHTML = months.join('');

        // Set selected month
        this.monthSelect.value = this.selectedMonth;
    }

    getFilteredExpenses() {
        // If "Month" (all) is selected, return all expenses
        if (this.selectedMonth === 'all') {
            return this.expenses;
        }
        // Otherwise filter by selected month
        return this.expenses.filter(expense =>
            this.getMonthKey(expense.date) === this.selectedMonth
        );
    }

    addExpense() {
        const item = this.itemInput.value.trim();
        const cost = parseFloat(this.costInput.value);
        const category = this.categorySelect.value;

        // Validation
        if (!item) {
            alert('Please enter an item name');
            this.itemInput.focus();
            return;
        }

        if (!cost || cost <= 0) {
            alert('Please enter a valid cost');
            this.costInput.focus();
            return;
        }

        // Create expense object with appropriate date
        let expenseDate;
        if (this.selectedMonth === 'all') {
            // If "Month" is selected, use current date
            expenseDate = new Date();
        } else {
            // Use selected month
            const [year, month] = this.selectedMonth.split('-').map(Number);
            expenseDate = new Date(year, month - 1, new Date().getDate());
        }

        const expense = {
            id: Date.now(),
            item,
            cost,
            category,
            date: expenseDate.toISOString()
        };

        // Add to expenses array
        this.expenses.unshift(expense);
        this.saveToStorage();

        // Clear form
        this.itemInput.value = '';
        this.costInput.value = '';
        this.categorySelect.value = 'Food';
        this.itemInput.focus();

        // Re-render
        this.render();
    }

    editExpense(id) {
        const expense = this.expenses.find(e => e.id === id);
        if (!expense) return;

        this.currentEditId = id;
        this.editItemInput.value = expense.item;
        this.editCostInput.value = expense.cost;
        this.editCategorySelect.value = expense.category;

        this.openModal();
    }

    saveEdit() {
        const item = this.editItemInput.value.trim();
        const cost = parseFloat(this.editCostInput.value);
        const category = this.editCategorySelect.value;

        if (!item || !cost || cost <= 0) {
            alert('Please enter valid values');
            return;
        }

        const expense = this.expenses.find(e => e.id === this.currentEditId);
        if (expense) {
            expense.item = item;
            expense.cost = cost;
            expense.category = category;
            this.saveToStorage();
            this.render();
            this.closeModal();
        }
    }

    deleteExpense(id) {
        if (confirm('Delete this expense?')) {
            this.expenses = this.expenses.filter(e => e.id !== id);
            this.saveToStorage();
            this.render();
        }
    }

    calculateTotal() {
        const filteredExpenses = this.getFilteredExpenses();
        return filteredExpenses.reduce((sum, expense) => sum + expense.cost, 0);
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Check if today
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        }

        // Check if yesterday
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }

        // Otherwise format as date
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }

    render() {
        // Get filtered expenses for selected month
        const filteredExpenses = this.getFilteredExpenses();

        // Update total
        const total = this.calculateTotal();
        this.totalAmount.textContent = this.formatCurrency(total);

        // Show/hide empty state
        if (filteredExpenses.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.expenseList.innerHTML = '';
            return;
        }

        this.emptyState.classList.add('hidden');

        // Render expense list
        this.expenseList.innerHTML = filteredExpenses.map(expense => `
            <div class="expense-item" data-id="${expense.id}">
                <div class="expense-header">
                    <div class="expense-info">
                        <div class="expense-item-name">${this.escapeHtml(expense.item)}</div>
                        <div class="expense-meta">
                            <span class="expense-category">${expense.category}</span>
                            <span class="expense-date">${this.formatDate(expense.date)}</span>
                        </div>
                    </div>
                    <div class="expense-amount">${this.formatCurrency(expense.cost)}</div>
                </div>
                <div class="expense-actions">
                    <button class="btn-edit" onclick="app.editExpense(${expense.id})">Edit</button>
                    <button class="btn-delete" onclick="app.deleteExpense(${expense.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    openModal() {
        this.editModal.classList.add('active');
    }

    closeModal() {
        this.editModal.classList.remove('active');
        this.currentEditId = null;
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }
}

// Initialize app when DOM is ready
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new ExpenseTracker();
    });
} else {
    app = new ExpenseTracker();
}
