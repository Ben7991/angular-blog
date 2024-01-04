import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ThemeControllerService {
  private theme: "mode-light" | "mode-dark"

  constructor(private renderer: RendererFactory2) {
    this.theme = "mode-light";
  }

  public initializeTheme() {
    if (localStorage.getItem("theme")) {
      this.theme = <"mode-light" | "mode-dark">localStorage.getItem("theme")!;
    }
    let render = this.renderer.createRenderer(document.body, null);
    render.addClass(document.body, this.theme);
    localStorage.setItem("theme", this.theme);
  }

  public get currentTheme() {
    return this.theme;
  }

  public changeTheme(theme: "mode-light" | "mode-dark") {
    let render = this.renderer.createRenderer(document.body, null);
    render.removeClass(document.body, this.theme);

    this.theme = theme;
    render.addClass(document.body, this.theme);
    localStorage.setItem("theme", this.theme);
  }
}
