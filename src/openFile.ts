export const openFile = (path: string, callback: (text: string) => void): void => {
    fetch(path)
      .then(response => response.text())
      .then(text => callback(text));
  }
  