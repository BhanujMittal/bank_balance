class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    deposit(fund) {
        fund = parseInt(fund);
        return this.balance += fund;
    }

    withdraw(fund) {
        fund = parseInt(fund)
        return this.balance -= fund;
    }

    balance() {
        console.log(`Available balance is: ${this.balance}`)
    }
}

const showNotification = (message) => {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';

    // Hide the notification after a certain time (e.g., 3 seconds)
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

let accountNumber = document.getElementById('accountNumber')
let holderName = document.getElementById('holderName')
let submit = document.getElementById('submit')
let backBtn = document.getElementById('back')
let accountDetails = document.getElementsByClassName('account-details')[0]
let accountUpdates = document.getElementsByClassName('account-updates')[0]
let accountBalance = document.getElementsByClassName('balance')[0]
let accountNum = document.getElementsByClassName('accountNumber')[0]
let amountInput = document.getElementById('amountInput')
let deposit = document.getElementById('deposit')
let withdraw = document.getElementById('withdraw')

let balance = 0;

// Check the initial state on page load

accountBalance.textContent = balance;
submit.addEventListener('click', (e) => {
    e.preventDefault()
    if ((accountNumber.value).length < 8 || (accountNumber.value) < 0) {
        showNotification("Invalid Account Number");
    } else {
        if ((accountNumber.value && holderName.value) != '') {
            if (localStorage.getItem(accountNumber.value)) {
                localStorage.setItem(accountNumber.value, localStorage.getItem(accountNumber.value))
                accountBalance.textContent = `Balance: ${localStorage.getItem(accountNumber.value)}`
            } else {
                localStorage.setItem(accountNumber.value, 0)
                accountBalance.textContent = `Balance: ${0}`;
            }
            showNotification(`Account details saved Successfully`);
            accountNum.innerHTML = `Account Number: ${accountNumber.value}`;
            accountUpdates.style.display = 'flex'
            accountDetails.style.display = 'none'
        }
    }
})

deposit.addEventListener('click', (e) => {
    e.preventDefault();
    if ((amountInput.value) < 0) {
        showNotification("Amount cannot be negative")
    } else {

        if (!(amountInput.value)) {
            amountInput.classList.add('redBorder')
            setTimeout(() => {
                amountInput.classList.remove('redBorder')
            }, 2000);
            notification.classList.add('fail')
            setTimeout(() => {
                notification.classList.remove('fail')
            }, 2000);
            showNotification('Enter Valid Amount')
        } else {
            let bal = new BankAccount(accountNumber.value, holderName.value, parseInt(localStorage.getItem(accountNumber.value))).deposit(amountInput.value)
            balance = bal;
            if (localStorage.getItem(accountNumber.value)) {
                localStorage.setItem(accountNumber.value, bal);
                accountBalance.textContent = `Balance: ${localStorage.getItem(accountNumber.value)}`;
            } else {
                localStorage.setItem(accountNumber.value, 0);
            }
            showNotification(`Deposited successfully!`)
            amountInput.value = ''
        }
    }
})

withdraw.addEventListener('click', (e) => {
    e.preventDefault();
    if ((amountInput.value) < 0) {
        showNotification("Amount Cannot be Negative");
    } else if ((amountInput.value > localStorage.getItem(accountNumber.value))) {
        notification.classList.add('fail')
        setTimeout(() => {
            notification.classList.remove('fail')
        }, 3000);
        showNotification('Insufficient Balance')
    } else {
        if (!(amountInput.value)) {
            amountInput.classList.add('redBorder');
            notification.classList.add('fail')
            setTimeout(() => {
                amountInput.classList.remove('redBorder')
                notification.classList.remove('fail')
            }, 2000);
            showNotification('Enter Valid Amount')
        } else {
            let bal = new BankAccount(accountNumber.value, holderName.value, parseInt(localStorage.getItem(accountNumber.value))).withdraw(amountInput.value)
            balance = bal;
            if (localStorage.getItem(accountNumber.value)) {
                localStorage.setItem(accountNumber.value, bal);
                accountBalance.textContent = `Balance: ${localStorage.getItem(accountNumber.value)}`;
            } else {
                localStorage.setItem(accountNumber.value, 0);
            }
            showNotification(`Withdrawn successfully!`)
            amountInput.value = ''
        }
    }
})

backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    accountUpdates.style.display = 'none'
    accountDetails.style.display = 'flex'
    accountNumber.value = '';
    holderName.value = '';
})