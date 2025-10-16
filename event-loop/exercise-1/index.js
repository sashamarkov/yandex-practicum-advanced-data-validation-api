document.addEventListener('DOMContentLoaded', async () => {
    let interval;
    let rejectFn;

    function startProgress() {
        const progressBar = document.getElementById('progress-bar');
        return new Promise((resolve, reject) => {
            rejectFn = reject;
            let width = 0;
            
            interval  = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(interval);
                        resolve ("ok");
                    } else {
                        width += Math.max(1, Math.round(3 * Math.random()));
                        progressBar.style.width = width + '%';
                    }
            }, 100);
        });
    }

    function stopProgress() {
        clearInterval(interval);
        if(rejectFn) {
            rejectFn("canceled");
        }
    }

    document.getElementById('start-button').onclick = async () => {
        try{
            let res = await startProgress();
            alert(`Результат выполнения: ${res}`);
        }
        catch(error) {
            alert(`Процесс отменён: ${error}`);
        }
        finally {
            interval = null;
            rejectFn = null;
        }
    }

    document.getElementById('stop-button').onclick = () => {
        stopProgress();
    }

})