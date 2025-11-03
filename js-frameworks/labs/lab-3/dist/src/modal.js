var NotificationService = (function () {
    function NotificationService() {
        this.toastContainer = document.querySelector('.toast-container');
        this.modalContainer = document.getElementById('modal-container');
    }
    NotificationService.prototype.showToast = function (message, type) {
        if (type === void 0) { type = 'success'; }
        var toastId = "toast-".concat(Date.now());
        var toastHTML = "\n      <div id=\"".concat(toastId, "\" class=\"toast align-items-center text-bg-").concat(type, " border-0\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n        <div class=\"d-flex\">\n          <div class=\"toast-body\">").concat(message, "</div>\n          <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n        </div>\n      </div>\n    ");
        this.toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        var toastElement = document.getElementById(toastId);
        toastElement.classList.add('show');
        setTimeout(function () {
            toastElement.classList.remove('show');
            setTimeout(function () { return toastElement.remove(); }, 500);
        }, 3000);
    };
    NotificationService.prototype.showBorrowModal = function (callback) {
        var _a, _b, _c;
        this.modalContainer.innerHTML = "\n      <div class=\"modal fade show\" id=\"borrowModal\" style=\"display: block; background: rgba(0,0,0,0.5);\">\n        <div class=\"modal-dialog modal-dialog-centered\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\">\u0412\u0432\u0435\u0434\u0456\u0442\u044C ID \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 \u0434\u043B\u044F \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u043D\u044F \u043A\u043D\u0438\u0433\u0438:</h5>\n              <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" id=\"modalCloseX\"></button>\n            </div>\n            <div class=\"modal-body\">\n              <input type=\"text\" class=\"form-control\" id=\"modalUserId\" placeholder=\"ID \u043A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430\">\n              <div class=\"invalid-feedback\" id=\"modalError\" style=\"display: none;\"></div>\n            </div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-secondary\" id=\"modalCancel\">\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</button>\n              <button type=\"button\" class=\"btn btn-primary\" id=\"modalSave\">\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
        var modal = document.getElementById('borrowModal');
        var modalError = document.getElementById('modalError');
        var closeModal = function () { return modal.remove(); };
        (_a = document
            .getElementById('modalCloseX')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', closeModal);
        (_b = document
            .getElementById('modalCancel')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', closeModal);
        (_c = document.getElementById('modalSave')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
            var userId = document.getElementById('modalUserId').value;
            if (!userId.trim() || !/^\d+$/.test(userId)) {
                modalError.textContent =
                    'ID користувача має складатися лише з цифр і не бути порожнім.';
                modalError.style.display = 'block';
                return;
            }
            modalError.style.display = 'none';
            callback(userId);
            closeModal();
        });
    };
    NotificationService.prototype.showInfoModal = function (title, message) {
        var _this = this;
        var _a;
        this.modalContainer.innerHTML = "\n      <div class=\"modal fade show\" style=\"display: block; background: rgba(0,0,0,0.5);\">\n        <div class=\"modal-dialog modal-dialog-centered\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\">".concat(title, "</h5>\n            </div>\n            <div class=\"modal-body\">\n              <p>").concat(message, "</p>\n            </div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-primary\" id=\"modalInfoClose\">\u0417\u0440\u043E\u0437\u0443\u043C\u0456\u043B\u043E!</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    ");
        (_a = document
            .getElementById('modalInfoClose')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
            _this.modalContainer.innerHTML = '';
        });
    };
    return NotificationService;
}());
export { NotificationService };
//# sourceMappingURL=modal.js.map