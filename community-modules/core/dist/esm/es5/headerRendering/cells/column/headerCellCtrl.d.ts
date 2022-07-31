// Type definitions for @ag-grid-community/core v28.1.0
// Project: https://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { UserCompDetails } from "../../../components/framework/userComponentFactory";
import { Column } from "../../../entities/column";
import { ColumnSortState } from "../../../utils/aria";
import { ITooltipFeatureComp } from "../../../widgets/tooltipFeature";
import { HeaderRowCtrl } from "../../row/headerRowCtrl";
import { AbstractHeaderCellCtrl, IAbstractHeaderCellComp } from "../abstractCell/abstractHeaderCellCtrl";
import { IHeader, IHeaderParams } from "./headerComp";
export interface IHeaderCellComp extends IAbstractHeaderCellComp, ITooltipFeatureComp {
    setWidth(width: string): void;
    addOrRemoveCssClass(cssClassName: string, on: boolean): void;
    setColId(id: string): void;
    setAriaDescription(description?: string): void;
    setAriaSort(sort?: ColumnSortState): void;
    setUserCompDetails(compDetails: UserCompDetails): void;
    getUserCompInstance(): IHeader | undefined;
}
export declare class HeaderCellCtrl extends AbstractHeaderCellCtrl {
    private readonly columnModel;
    private readonly columnHoverService;
    private readonly sortController;
    private readonly menuFactory;
    private readonly dragAndDropService;
    private readonly resizeObserverService;
    private readonly gridApi;
    private readonly columnApi;
    private colDefVersion;
    private comp;
    private column;
    private refreshFunctions;
    private selectAllFeature;
    private moveDragSource;
    private sortable;
    private displayName;
    private draggable;
    private menuEnabled;
    private dragSourceElement;
    private userCompDetails;
    private userHeaderClasses;
    private ariaDescriptionProperties;
    constructor(column: Column, parentRowCtrl: HeaderRowCtrl);
    setComp(comp: IHeaderCellComp, eGui: HTMLElement, eResize: HTMLElement, eHeaderCompWrapper: HTMLElement): void;
    private setupUserComp;
    private setCompDetails;
    private lookupUserCompDetails;
    private createParams;
    private setupSelectAll;
    getSelectAllGui(): HTMLElement;
    protected handleKeyDown(e: KeyboardEvent): void;
    private onEnterKeyPressed;
    isMenuEnabled(): boolean;
    private onFocusIn;
    private onFocusOut;
    private setupTooltip;
    private setupClassesFromColDef;
    setDragSource(eSource: HTMLElement | undefined): void;
    private createDragItem;
    removeDragSource(): void;
    private onNewColumnsLoaded;
    private updateState;
    addRefreshFunction(func: () => void): void;
    private refresh;
    private refreshHeaderComp;
    attemptHeaderCompRefresh(params: IHeaderParams): boolean;
    private calculateDisplayName;
    private checkDisplayName;
    private workOutDraggable;
    private onColumnRowGroupChanged;
    private onColumnPivotChanged;
    private onColumnValueChanged;
    private setupWidth;
    private setupMovingCss;
    private setupMenuClass;
    private setupSortableClass;
    private setupWrapTextClass;
    private setupAutoHeight;
    private refreshAriaSort;
    private refreshAriaMenu;
    setAriaDescriptionProperty(property: string, value: string | null): void;
    refreshAriaDescription(): void;
    private refreshAria;
    private addColumnHoverListener;
    private setupFilterCss;
    private setupColId;
    private addActiveHeaderMouseListeners;
    private setActiveHeader;
}
