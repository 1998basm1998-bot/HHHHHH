let username = localStorage.getItem('chatAppUsername');

window.onload = function() {
    if (!username) {
        document.getElementById('welcomeModal').style.display = 'flex';
    } else {
        document.getElementById('welcomeModal').style.display = 'none';
        document.getElementById('displayName').innerText = username;
    }
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

// تبديل التبويبات الرئيسية (أسفل الشاشة)
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active-tab');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active-nav');
    });
    
    document.getElementById(tabId).classList.add('active-tab');
    
    // تحديد الزر النشط في الأسفل (بسيط)
    event.currentTarget.classList.add('active-nav');
}

// تبديل العرض داخل تبويب الدردشة (عامة vs غرف)
function showChatView(viewType) {
    // إخفاء كل الواجهات
    document.getElementById('view-general').style.display = 'none';
    document.getElementById('view-rooms').style.display = 'none';
    
    // إزالة التنشيط من الأزرار العلوية
    document.getElementById('btn-general').classList.remove('active');
    document.getElementById('btn-rooms').classList.remove('active');

    if (viewType === 'general') {
        document.getElementById('view-general').style.display = 'flex'; // flex لضمان التمدد
        document.getElementById('btn-general').classList.add('active');
    } else if (viewType === 'rooms') {
        document.getElementById('view-rooms').style.display = 'block';
        document.getElementById('btn-rooms').classList.add('active');
    }
}

// إدارة مودال إنشاء الغرفة
function openCreateRoomModal() {
    document.getElementById('createRoomModal').style.display = 'flex';
}

function closeRoomModal() {
    document.getElementById('createRoomModal').style.display = 'none';
}
