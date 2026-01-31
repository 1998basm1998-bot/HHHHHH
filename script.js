let username = localStorage.getItem('chatAppUsername');

window.onload = function() {
    if (!username) {
        document.getElementById('welcomeModal').style.display = 'flex';
    } else {
        document.getElementById('welcomeModal').style.display = 'none';
        document.getElementById('displayName').innerText = username;
    }
    startCountdown();
};

function saveUserAndStart() {
    const inputName = document.getElementById('usernameInput').value;
    if (inputName.trim() !== "") {
        localStorage.setItem('chatAppUsername', inputName);
        username = inputName;
        document.getElementById('displayName').innerText = username;
        document.getElementById('welcomeModal').style.display = 'none';
    } else {
        showNotification("الرجاء كتابة اسم للدخول"); // استخدام التنبيه الجديد
    }
}

// --- دالة التنبيه المخصص الجديدة ---
function showNotification(message) {
    const notif = document.getElementById('customNotification');
    const notifText = document.getElementById('notificationText');
    
    notifText.innerText = message;
    notif.classList.add('show');
    
    // إخفاء التنبيه تلقائياً بعد 3 ثواني
    setTimeout(() => {
        notif.classList.remove('show');
    }, 3000);
}

// --- نظام التنقل ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-nav'));
    document.getElementById(tabId).classList.add('active-tab');
    event.currentTarget.classList.add('active-nav');
}

// --- منطق الدردشة ---
function enterChatMode(type) {
    document.getElementById('chat-selection-screen').style.display = 'none';
    document.getElementById('active-chat-interface').style.display = 'flex';
    document.getElementById('view-general').style.display = 'none';
    document.getElementById('view-rooms').style.display = 'none';
    
    if (type === 'general') {
        document.getElementById('view-general').style.display = 'flex';
        document.getElementById('currentChatTitle').innerText = 'الدردشة العامة';
    } else {
        document.getElementById('view-rooms').style.display = 'block';
        document.getElementById('currentChatTitle').innerText = 'الغرف yoz';
    }
}

function exitChatMode() {
    document.getElementById('active-chat-interface').style.display = 'none';
    document.getElementById('chat-selection-screen').style.display = 'flex';
}

function openCreateRoomModal() {
    document.getElementById('createRoomModal').style.display = 'flex';
}

function closeRoomModal() {
    document.getElementById('createRoomModal').style.display = 'none';
}

// --- عداد السينما ---
function startCountdown() {
    let duration = 3600;
    const timerElement = document.getElementById('timer');
    setInterval(() => {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = duration % 60;
        timerElement.innerText = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (duration > 0) duration--;
    }, 1000);
}
