export default function normalizeChannelName(name) {
  // Convert to lowercase, replace spaces with hyphens, remove special characters
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}
