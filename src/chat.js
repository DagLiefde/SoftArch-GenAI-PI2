document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation back Home
    const headers = Array.from(document.querySelectorAll('h2'));
    const homeBtnText = headers.find(h => h.textContent.includes('Nexus Workspace'));
    if (homeBtnText) {
        const homeBtn = homeBtnText.parentElement;
        if (homeBtn) {
            homeBtn.style.cursor = 'pointer';
            homeBtn.addEventListener('click', () => {
                window.location.href = './index.html';
            });
        }
    }

    // 2. Chat Input and Suggestion Chips
    const chips = document.querySelectorAll('.flex-wrap > button');
    const textarea = document.querySelector('textarea');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            textarea.value = chip.textContent;
            chips.forEach(c => {
                c.className = 'px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-primary text-xs font-medium text-slate-600 dark:text-slate-400 transition-all';
            });
            chip.className = 'px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 text-xs font-medium text-primary transition-all';
        });
    });

    const sendBtnContainer = document.querySelector('.flex.items-center.justify-between.border-t');
    if (sendBtnContainer) {
        const sendBtn = Array.from(sendBtnContainer.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Send Request'));
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                if (textarea.value.trim() !== '') {
                    const text = textarea.value;
                    textarea.value = '';

                    const chatHistory = document.querySelector('.flex-1.overflow-y-auto.p-8.space-y-6');
                    if (chatHistory) {
                        const userMessageHtml = `
                        <div class="flex gap-4 max-w-3xl mx-auto mt-6">
                            <div class="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center">
                                <span class="material-symbols-outlined text-slate-600 dark:text-slate-400">person</span>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm leading-relaxed text-slate-800 dark:text-slate-200">${text}</p>
                            </div>
                        </div>`;
                        chatHistory.insertAdjacentHTML('beforeend', userMessageHtml);
                        chatHistory.scrollTo(0, chatHistory.scrollHeight);

                        // Mock agent response after a short delay
                        setTimeout(() => {
                            const agentHtml = `
                            <div class="flex gap-4 max-w-3xl mx-auto mt-6">
                                <div class="h-8 w-8 rounded-lg bg-primary flex-shrink-0 flex items-center justify-center shadow-lg shadow-primary/20">
                                    <span class="material-symbols-outlined text-white text-lg">smart_toy</span>
                                </div>
                                <div class="flex-1 space-y-4">
                                    <div class="text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                                        I am processing your request: "${text}". Please wait while I generate the relevant code and artifacts.
                                    </div>
                                </div>
                            </div>
                           `;
                            chatHistory.insertAdjacentHTML('beforeend', agentHtml);
                            chatHistory.scrollTo(0, chatHistory.scrollHeight);
                        }, 1000);
                    }
                }
            });
        }
    }
});
