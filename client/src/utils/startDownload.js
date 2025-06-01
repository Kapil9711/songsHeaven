import notify from "./notify";
const startDownload = (fileLink, fileName) => {
  // Fetch the file as a Blob
  if (fileLink?.startsWith('http://')) {
  fileLink = fileLink.replace('http://', 'https://');
}
  
  const [res, rej] = notify();
  fetch(fileLink)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a download link for the Blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;

      // Append the link to the document, trigger a click, and remove it
      document.body.appendChild(link);
      res("Download started");
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      rej("Something Went Wrong, Try Agian Later");
      console.error("Error downloading the file:", error);
    });
};

export default startDownload;
