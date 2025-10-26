export class NotificationService {
    private toastContainer: HTMLElement;
    private modalContainer: HTMLElement;

    constructor() {
        this.toastContainer = document.querySelector('.toast-container')!;
        this.modalContainer = document.getElementById('modal-container')!;
    }

    showToast(
        message: string,
        type: 'success' | 'warning' | 'danger' = 'success'
    ): void {
        const toastId = `toast-${Date.now()}`;
        const toastHTML = `
      <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
        this.toastContainer.insertAdjacentHTML('beforeend', toastHTML);

        const toastElement = document.getElementById(toastId)!;
        toastElement.classList.add('show');
        setTimeout(() => {
            toastElement.classList.remove('show');
            setTimeout(() => toastElement.remove(), 500);
        }, 3000);
    }

    showBorrowModal(callback: (userId: string) => void): void {
        this.modalContainer.innerHTML = `
      <div class="modal fade show" id="borrowModal" style="display: block; background: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Введіть ID користувача для позичення книги:</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" id="modalCloseX"></button>
            </div>
            <div class="modal-body">
              <input type="text" class="form-control" id="modalUserId" placeholder="ID користувача">
              <div class="invalid-feedback" id="modalError" style="display: none;"></div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="modalCancel">Скасувати</button>
              <button type="button" class="btn btn-primary" id="modalSave">Зберегти</button>
            </div>
          </div>
        </div>
      </div>
    `;

        const modal = document.getElementById('borrowModal')!;
        const modalError = document.getElementById('modalError') as HTMLElement;

        const closeModal = () => modal.remove();

        document
            .getElementById('modalCloseX')
            ?.addEventListener('click', closeModal);
        document
            .getElementById('modalCancel')
            ?.addEventListener('click', closeModal);

        document.getElementById('modalSave')?.addEventListener('click', () => {
            const userId = (
                document.getElementById('modalUserId') as HTMLInputElement
            ).value;

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
    }

    showInfoModal(title: string, message: string): void {
        this.modalContainer.innerHTML = `
      <div class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${title}</h5>
            </div>
            <div class="modal-body">
              <p>${message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="modalInfoClose">Зрозуміло!</button>
            </div>
          </div>
        </div>
      </div>
    `;

        document
            .getElementById('modalInfoClose')
            ?.addEventListener('click', () => {
                this.modalContainer.innerHTML = '';
            });
    }
}
