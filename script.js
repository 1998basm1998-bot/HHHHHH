// --- المتغيرات العامة ---
let userPoints = 1000; // رصيد افتراضي للمحفظة
let username = localStorage.getItem('chatAppUsername');

// --- عند تشغيل الصفحة ---
window.onload = function() {
    if (!username) {
        document.getElementById('welcomeModal').style.display = 'flex';
    } else {
        document.getElementById('welcomeModal').style.display = 'none';
        document.getElementById('displayName').innerText = username;
        // هنا يمكنك إضافة كود جلب بيانات الأدمن (البنر والرسالة)
    }
    updateWalletDisplay();
};

// --- دالة حفظ المستخدم ---
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

// --- نظام التبويبات ---
function switchTab(tabId) {
    // إخفاء جميع التبويبات
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active-tab');
    });
    // إظهار التبويب المطلوب
    document.getElementById(tabId).classList.add('active-tab');
}

// --- نظام الاشتراك المدفوع ---
function openPrivateSub() {
    document.getElementById('subscriptionModal').style.display = 'flex';
}

function closeSubModal() {
    document.getElementById('subscriptionModal').style.display = 'none';
}

// --- نظام التحدي والزار ---
function openChallenge() {
    document.getElementById('challengeModal').style.display = 'flex';
    document.getElementById('diceResult').innerText = "";
}

function startDiceGame() {
    const wagerInput = document.getElementById('challengePoints');
    const wager = parseInt(wagerInput.value);

    // التحقق من المدخلات والمحفظة
    if (isNaN(wager) || wager <= 0) {
        alert("الرجاء إدخال رقم نقاط صحيح");
        return;
    }
    if (wager > userPoints) {
        alert("عذراً، لا تملك نقاط كافية في المحفظة!");
        return;
    }

    // خصم النقاط مبدئياً (محاكاة)
    // هنا يبدأ المنطق:
    // 1. توليد رقمين عشوائيين
    const myRoll = Math.floor(Math.random() * 6) + 1; // رقمي
    const opponentRoll = Math.floor(Math.random() * 6) + 1; // رقم الخصم (وهمي حالياً)
    
    let resultText = `أنت: ${myRoll} | الخصم: ${opponentRoll}`;
    let resultColor = "black";

    if (myRoll > opponentRoll) {
        // فوز
        resultText += " 🎉 مبروك فزت!";
        userPoints += wager; // تكسب الضعف (استعدت مالك + الربح)
        resultColor = "green";
    } else if (myRoll < opponentRoll) {
        // خسارة
        resultText += " 😢 حظ أوفر.. خسرت";
        userPoints -= wager;
        resultColor = "red";
    } else {
        // تعادل
        resultText += " 🤝 تعادل (استرجاع النقاط)";
    }

    // عرض النتيجة
    const resDiv = document.getElementById('diceResult');
    resDiv.innerText = resultText;
    resDiv.style.color = resultColor;
    
    updateWalletDisplay();
}

function updateWalletDisplay() {
    document.getElementById('walletPoints').innerText = userPoints;
    document.getElementById('currentWalletBalance').innerText = userPoints;
}

// دالة المحاكاة للأدمن (يمكن ربطها بفايربيس لاحقاً)
function setAdminData(bannerUrl, newsText) {
    document.getElementById('adminBanner').innerHTML = `<img src="${bannerUrl}" alt="Banner">`;
    document.getElementById('adminNews').innerText = newsText;
}
