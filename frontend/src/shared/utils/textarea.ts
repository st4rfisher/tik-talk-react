export function fitTextareaToContent(textArea: HTMLTextAreaElement): void {
  textArea.style.height = 'auto'
  textArea.style.height = `${textArea.scrollHeight}px`
}
