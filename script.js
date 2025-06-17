// script-simple.js - لحاسبة الكربوهيدرات المبسطة
// يعتمد على وجود foodData في ملف data.js

function populateFoodCategories() {
    const foodCategorySelect = document.getElementById("foodCategory");
    foodCategorySelect.innerHTML = '<option value="">-- اختار فئة الأكل --</option>';

    for (const category in foodData) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        foodCategorySelect.appendChild(option);
    }
    // مسح قائمة الأطعمة ومعامل الكربوهيدرات والنتيجة عند إعادة ملء الفئات
    document.getElementById("foodItem").innerHTML = '<option value="">-- اختار نوع الأكل --</option>';
    document.getElementById("carbFactor").value = '';
    document.getElementById("foodAmount").value = '';
    document.getElementById("resultDisplay").innerHTML = 'الكاربوهيدرات الكلية المقدرة: <strong>0 غرام</strong>';

    // اختيار أول فئة تلقائيًا وملء قائمة الأطعمة الخاصة بها
    if (Object.keys(foodData).length > 0) {
        foodCategorySelect.value = Object.keys(foodData)[0];
        populateFoodItems();
    }
}

function populateFoodItems() {
    const foodCategorySelect = document.getElementById("foodCategory");
    const foodItemSelect = document.getElementById("foodItem");
    const carbFactorInput = document.getElementById("carbFactor");
    const resultDisplay = document.getElementById("resultDisplay");

    foodItemSelect.innerHTML = '<option value="">-- اختار نوع الأكل --</option>';
    carbFactorInput.value = '';
    resultDisplay.innerHTML = 'الكاربوهيدرات الكلية المقدرة: <strong>0 غرام</strong>'; // إعادة تعيين النتيجة

    const selectedCategory = foodCategorySelect.value;

    if (selectedCategory && foodData[selectedCategory]) {
        for (const item in foodData[selectedCategory]) {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            foodItemSelect.appendChild(option);
        }
    }
}

function setCarbFactorFromData() {
    const foodCategorySelect = document.getElementById("foodCategory");
    const foodItemSelect = document.getElementById("foodItem");
    const carbFactorInput = document.getElementById("carbFactor");

    const selectedCategory = foodCategorySelect.value;
    const selectedItem = foodItemSelect.value;

    if (selectedCategory && selectedItem && foodData[selectedCategory] && foodData[selectedCategory][selectedItem]) {
        carbFactorInput.value = foodData[selectedCategory][selectedItem].carbsPer100g;
    } else {
        carbFactorInput.value = '';
    }
    calculateAndDisplayCarbs(); // إعادة حساب الكربوهيدرات عند تغيير نوع الأكل
}

function calculateAndDisplayCarbs() {
    const foodAmount = parseFloat(document.getElementById("foodAmount").value);
    const carbFactor = parseFloat(document.getElementById("carbFactor").value);
    const resultDisplay = document.getElementById("resultDisplay");

    if (!isNaN(foodAmount) && !isNaN(carbFactor) && foodAmount > 0) {
        const totalCarbs = (foodAmount / 100) * carbFactor;
        resultDisplay.innerHTML = `الكاربوهيدرات الكلية المقدرة: <strong>${totalCarbs.toFixed(1)} غرام</strong>`;
    } else {
        resultDisplay.innerHTML = 'الكاربوهيدرات الكلية المقدرة: <strong>0 غرام</strong>';
    }
}

// تشغيل الدوال عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    populateFoodCategories();
    // إضافة مستمعي الأحداث لحساب الكاربوهيدرات الكلية فورًا عند تغيير الكمية
    document.getElementById("foodAmount").addEventListener("input", calculateAndDisplayCarbs);
});