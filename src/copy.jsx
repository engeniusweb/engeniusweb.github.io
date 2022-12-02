import deselectCurrent from 'toggle-selection';

/**
 * Copy HTML text to clipboard
 * @param html The text to copy
 * @returns {boolean} Sucess/failure
 */
export function copyHTML(html) {
  // Use the modern API if possible
  try {
    const blobHtml = new Blob([html], { type: 'text/html' });
    const clipboardItem = new ClipboardItem({'text/html': blobHtml });
    navigator.clipboard.write([clipboardItem]);
    return true;
  } catch {}

  // Fall back to other methods
  let reselectPrevious;
  let range;
  let selection;
  let mark;
  let success = false;
  
  try {
    // Deselect any selections
    reselectPrevious = deselectCurrent();

    // Create new selection
    range = document.createRange();
    selection = document.getSelection();

    // Create element to copy
    mark = document.createElement('span');
    mark.textContent = html;
    // Stop screen readers from reading out loud the text
    mark.ariaHidden = 'true'
    // Reset user styles for span element
    mark.style.all = 'unset';
    // Prevent scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = 0;
    mark.style.clip = 'rect(0, 0, 0, 0)';
    // Preserve spaces and line breaks
    mark.style.whiteSpace = 'pre';
    // Do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';
    mark.addEventListener('copy', function(event) {
      event.stopPropagation();
      event.preventDefault();
      event.clipboardData.clearData();
      event.clipboardData.setData('text/html', html);
    });

    // Copy element!
    document.body.appendChild(mark);
    range.selectNodeContents(mark);
    selection.addRange(range);
    if (!document.execCommand('copy')) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    try {
      window.clipboardData.setData('text/html', html);
      success = true;
    } catch (err) {}
  } finally {
    if (selection) {
      if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }

    reselectPrevious();
  }

  return success;
}