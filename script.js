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

// Hàm xử lý thanh toán (Đã cập nhật tính năng xác nhận số tiền chuyển khoản)
function processPayment(totalValue) {
    let address = prompt("📍 VUI LÒNG NHẬP ĐỊA CHỈ NHẬN HÀNG:");
    if (!address) return;

    let formattedTotal = totalValue.toLocaleString('vi-VN') + "đ";

    let paymentMsg = "📍 Giao đến: " + address + "\n";
    paymentMsg += "💰 Tổng tiền: " + formattedTotal + "\n\n";
    paymentMsg += "CHỌN PHƯƠNG THỨC THANH TOÁN:\n1. Thanh toán khi nhận hàng (COD)\n2. Chuyển khoản ngân hàng";

    let payMethod = prompt(paymentMsg);

    if (payMethod === "1") {
        alert("✅ Đặt hàng thành công! Đơn hàng sẽ được thanh toán COD và giao đến: " + address);
        resetCart(); // Xóa sạch sau khi mua xong
        
    } else if (payMethod === "2") {
        let bankingInfo = "🏦 THÔNG TIN CHUYỂN KHOẢN:\n\n";
        bankingInfo += "▪ Ngân hàng: VIETCOMBANK (VCB)\n";
        bankingInfo += "▪ Số tài khoản: DH52300964\n";
        bankingInfo += "▪ Tên chủ tài khoản: THIEU QUANG KIET\n";
        bankingInfo += "▪ Số tiền cần chuyển: " + formattedTotal + "\n";
        bankingInfo += "▪ Nội dung chuyển khoản: Thanh toan don hang\n\n";
        bankingInfo += "👉 VUI LÒNG NHẬP CHÍNH XÁC SỐ TIỀN CẦN CHUYỂN (" + totalValue + ") ĐỂ XÁC NHẬN:";

        // Hiển thị prompt để người dùng nhập số tiền
        let transferAmount = prompt(bankingInfo);

        if (transferAmount === null) {
            // Người dùng bấm Cancel bỏ qua
            return; 
        } else if (parseInt(transferAmount) === totalValue) {
            // Nhập đúng số tiền
            alert("✅ Đặt hàng thành công! Đơn hàng sẽ sớm giao đến: " + address);
            resetCart();
        } else {
            // Nhập sai số tiền
            alert("❌ Số tiền nhập không chính xác. Giao dịch đã bị hủy!");
        }
        
    } else if (payMethod !== null) {
        alert("❌ Lựa chọn không hợp lệ. Vui lòng thực hiện lại thanh toán!");
    }
}

// Hàm cập nhật số lượn
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
let bannerImages = ["images/banner/banner1.jpg", "images/banner/banner2.jpg", "images/banner/banner3.jpg", "images/banner/banner4.png"];
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