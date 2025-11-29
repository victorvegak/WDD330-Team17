export default class Alert {
  constructor(jsonPath, parentElement) {
    this.jsonPath = jsonPath;          // Path to alerts.json
    this.parentElement = parentElement; // Parent DOM element to prepend alerts
  }

  async init() {
    try {
      const response = await fetch(this.jsonPath);
      if (!response.ok) throw new Error("Error loading alerts.json");

      const alerts = await response.json();

      // No alerts to display
      if (!alerts || alerts.length === 0) return;

      // create <section>
      const section = document.createElement("section");
      section.classList.add("alert-list");

      // Create alerts
      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.message;

        // Apply styles
        p.style.background = alert.background;
        p.style.color = alert.color;
        p.style.padding = "1rem";
        p.style.margin = "0";
        p.style.fontWeight = "600";

        section.appendChild(p);
      });

      // Prepend to parent element
      this.parentElement.prepend(section);

    } catch (error) {
      console.error("Alert loading error:", error);
    }
  }
}
