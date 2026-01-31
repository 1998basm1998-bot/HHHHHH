let username = localStorage.getItem('chatAppUsername');

window.onload = function() {
    if (!username) {
        document.getElementById('welcomeModal').style.display = 'flex';
    } else {
        document.getElementById('welcomeModal').style.display = 'none';
        document.getElementById('displayName').innerText = username;
    }
    startCountdown(); // تشغيل عداد السينما
};

function saveUserAndStart() {
    const inputName = document.getElementById('usernameInput').value;
    if (inputName.trim() !== "") {
        localStorage.setItem('chatAppUsername', inputName);
        username = inputName;
        document.getElementById('displayName').innerText = username;
        document.getElementById('welcomeModal').style.display = 'none';
    } else {
        alert("الرجاء كتابة اسم للدخول");
    }
}

// --- نظام التنقل بين التبويبات الرئيسية ---
function switchTab(tabId) {
    // إخفاء جميع التبويبات
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active-tab');
    });
    // إلغاء تفعيل جميع أزرار النافبار
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active-nav');
    });
    
    // تفعيل التبويب والزر المختار
    document.getElementById(tabId).classList.add('active-tab');
    event.currentTarget.classList.add('active-nav');
}

// --- منطق الدردشة الجديد (إخفاء الأزرار وإظهار الرجوع) ---
function enterChatMode(type) {
    // إخفاء شاشة الاختيار
    document.getElementById('chat-selection-screen').style.display = 'none';
    
    // إظهار واجهة الشات الكاملة
    document.getElementById('active-chat-interface').style.display = 'flex';
    
    // تحديد أي قسم يظهر داخل الشات
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
    // العودة لشاشة الاختيار
    document.getElementById('active-chat-interface').style.display = 'none';
    document.getElementById('chat-selection-screen').style.display = 'flex';
}

// --- إدارة الغرف ---
function openCreateRoomModal() {
    document.getElementById('createRoomModal').style.display = 'flex';
}

function closeRoomModal() {
    document.getElementById('createRoomModal').style.display = 'none';
}

// --- عداد السينما ---
function startCountdown() {
    let duration = 3600; // ساعة
    const timerElement = document.getElementById('timer');
    
    setInterval(() => {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = duration % 60;
        
        // تنسيق الوقت (00:00:00)
        timerElement.innerText = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (duration > 0) duration--;
    }, 1000);
}
