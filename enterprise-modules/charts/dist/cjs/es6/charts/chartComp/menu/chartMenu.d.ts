import { Component } from "@ag-grid-community/core";
import { ChartController } from "../chartController";
import { ChartOptionsService } from "../services/chartOptionsService";
export declare class ChartMenu extends Component {
    private readonly eChartContainer;
    private readonly eMenuPanelContainer;
    private readonly chartController;
    private readonly chartOptionsService;
    private chartTranslationService;
    static EVENT_DOWNLOAD_CHART: string;
    private buttons;
    private tabs;
    private static TEMPLATE;
    private tabbedMenu;
    private menuPanel?;
    private menuVisible;
    constructor(eChartContainer: HTMLElement, eMenuPanelContainer: HTMLElement, chartController: ChartController, chartOptionsService: ChartOptionsService);
    private postConstruct;
    isVisible(): boolean;
    private getToolbarOptions;
    private toggleDetached;
    private createButtons;
    private saveChart;
    private createMenuPanel;
    private showContainer;
    private showMenu;
    private hideMenu;
    private refreshMenuClasses;
    private showParent;
    private hideParent;
    protected destroy(): void;
}
