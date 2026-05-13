// --- QUẢN LÝ GIỎ HÀNG (ĐÃ SỬA LỖI CHUYỂN TRANG) ---

// Thay vì khai báo mảng rỗng, ta lấy dữ liệu từ LocalStorage về
let cartList = JSON.parse(localStorage.getItem('phoneShopCart')) || [];

// Khi trang vừa load, phải cập nhật con số hiển thị ngay
window.onload = function() {
    updateCartCount();
};

// Hàm thêm sản phẩm
function addCart(name, price) {
    cartList.push({ name: name, price: price });
    
    // LƯU VÀO TRÌNH DUYỆT: Chuyển mảng thành chuỗi để lưu
    localStorage.setItem('phoneShopCart', JSON.stringify(cartList));
    
    updateCartCount();
    alert("✅ Đã thêm " + name + " vào giỏ hàng!");
}

// Hàm hiển thị và quản lý giỏ hàng
function showCart() {
    if (cartList.length === 0) {
        alert("🛒 Giỏ hàng của bạn đang trống!");
        return;
    }

    let message = "🛒 DANH SÁCH GIỎ HÀNG:\n\n";
    let total = 0;

    cartList.forEach((item, i) => {
        message += (i + 1) + ". " + item.name + " - " + item.price + "đ\n";
        total += parseInt(item.price.replace(/\./g, ''));
    });

    message += "\n--------------------------\n";
    message += "💰 Tổng cộng: " + total.toLocaleString('vi-VN') + "đ\n\n";
    message += "LỰA CHỌN CỦA BẠN:\n";
    message += "1. Tiếp tục thanh toán\n";
    message += "2. Xóa một sản phẩm (nhập số thứ tự)\n";
    message += "3. Xóa toàn bộ giỏ hàng\n";

    let choice = prompt(message);

    if (choice === "1") {
        processPayment(total); 
    } 
    else if (choice === "2") {
        let stt = prompt("Nhập số thứ tự sản phẩm bạn muốn xóa:");
        let indexToRemove = parseInt(stt) - 1;

        if (indexToRemove >= 0 && indexToRemove < cartList.length) {
            if (confirm("Bạn có chắc muốn xóa: " + cartList[indexToRemove].name + "?")) {
                cartList.splice(indexToRemove, 1);
                // CẬP NHẬT LẠI BỘ NHỚ SAU KHI XÓA
                localStorage.setItem('phoneShopCart', JSON.stringify(cartList));
                updateCartCount();
                showCart(); 
            }
        } else if (stt !== null) {
            alert("❌ Số thứ tự không tồn tại!");
            showCart();
        }
    } 
    else if (choice === "3") {
        if (confirm("⚠️ Xóa TOÀN BỘ giỏ hàng?")) {
            resetCart();
        }
    }
}

// Hàm xử lý thanh toán
function processPayment(totalValue) {
    let address = prompt("📍 VUI LÒNG NHẬP ĐỊA CHỈ NHẬN HÀNG:");
    if (!address) return;

    let paymentMsg = "📍 Giao đến: " + address + "\n";
    paymentMsg += "💰 Tổng tiền: " + totalValue.toLocaleString('vi-VN') + "đ\n\n";
    paymentMsg += "CHỌN PTTT: 1. COD | 2. Chuyển khoản";

    let payMethod = prompt(paymentMsg);

    if (payMethod === "1" || payMethod === "2") {
        alert("✅ Đặt hàng thành công! Đơn hàng sẽ sớm giao đến: " + address);
        resetCart(); // Xóa sạch sau khi mua xong
    }
}

// Hàm cập nhật số lượng
function updateCartCount() {
    let countElement = document.getElementById("count");
    if (countElement) {
        countElement.innerHTML = cartList.length;
    }
}

// Hàm reset giỏ hàng
function resetCart() {
    cartList = [];
    localStorage.removeItem('phoneShopCart'); // XÓA BỘ NHỚ TRÌNH DUYỆT
    updateCartCount();
}

// --- SLIDER BANNER ---
let bannerImages = ["images/banner1.jpg", "images/banner2.jpg", "images/banner3.jpg", "images/banner4.png"];
let bannerIndex = 0;

function changeSlide() {
    bannerIndex++;
    if (bannerIndex >= bannerImages.length) bannerIndex = 0;
    
    let img = document.getElementById("slide");
    if (img) {
        // Thêm hiệu ứng mờ dần khi chuyển ảnh (tùy chọn)
        img.style.opacity = "0.8";
        setTimeout(() => {
            img.src = bannerImages[bannerIndex];
            img.style.opacity = "1";
        }, 200);
    }
}
setInterval(changeSlide, 3000);