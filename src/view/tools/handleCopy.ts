import ClipboardJS from 'clipboard';
import { ElMessage } from 'element-plus';
function handleCopy(copyText: any) {
    const clipboard = new ClipboardJS('.one-btn', {
        text: () => copyText
    })
    clipboard.on('success', () => {
        ElMessage({
            message:"复制成功！",
            type: 'success'
        })
        clipboard.destroy();
    })
    clipboard.on('error', () => {
        ElMessage({
            message:"复制失败，请稍后再试！",
            type: 'error'
        })
        clipboard.destroy();
      });
}

export default handleCopy;