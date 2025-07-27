export function getDomainName(url: string): string | null {
  try {
    const urlObject = new URL(url);
    const hostname = urlObject.hostname;

    // Optional: remove "www."
    if (hostname.startsWith('www.')) {
      return hostname.substring(4);
    }
    return hostname;
  } catch (error) {
    console.error("Invalid URL:", url, error);
    return null;
  }
}