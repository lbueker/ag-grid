import { ColumnApi } from './columns/columnApi';
import { ColDef, ColGroupDef, IAggFunc, SuppressKeyboardEventParams } from './entities/colDef';
import { GridOptions } from './entities/gridOptions';
import { GetGroupAggFilteringParams, GetGroupRowAggParams, GetRowIdParams, InitialGroupOrderComparatorParams, IsFullWidthRowParams, PostSortRowsParams } from './entities/iCallbackParams';
import { RowNode } from './entities/rowNode';
import { SideBarDef } from './entities/sideBar';
import { AgEvent } from './events';
import { GridApi } from './gridApi';
import { CsvExportParams } from './interfaces/exportParams';
import { AgChartTheme, AgChartThemeOverrides } from "./interfaces/iAgChartOptions";
import { WithoutGridCommon } from './interfaces/iCommon';
import { IDatasource } from './interfaces/iDatasource';
import { ExcelExportParams } from './interfaces/iExcelCreator';
import { IServerSideDatasource } from './interfaces/iServerSideDatasource';
import { IViewportDatasource } from './interfaces/iViewportDatasource';
export interface PropertyChangedEvent extends AgEvent {
    currentValue: any;
    previousValue: any;
}
export declare class GridOptionsWrapper {
    private static MIN_COL_WIDTH;
    static PROP_HEADER_HEIGHT: 'headerHeight';
    static PROP_GROUP_REMOVE_SINGLE_CHILDREN: 'groupRemoveSingleChildren';
    static PROP_GROUP_REMOVE_LOWEST_SINGLE_CHILDREN: 'groupRemoveLowestSingleChildren';
    static PROP_PIVOT_HEADER_HEIGHT: 'pivotHeaderHeight';
    static PROP_SUPPRESS_CLIPBOARD_PASTE: 'suppressClipboardPaste';
    static PROP_GROUP_HEADER_HEIGHT: 'groupHeaderHeight';
    static PROP_PIVOT_GROUP_HEADER_HEIGHT: 'pivotGroupHeaderHeight';
    static PROP_NAVIGATE_TO_NEXT_CELL: 'navigateToNextCell';
    static PROP_TAB_TO_NEXT_CELL: 'tabToNextCell';
    static PROP_NAVIGATE_TO_NEXT_HEADER: 'navigateToNextHeader';
    static PROP_TAB_TO_NEXT_HEADER: 'tabToNextHeader';
    static PROP_IS_EXTERNAL_FILTER_PRESENT: 'isExternalFilterPresent';
    static PROP_DOES_EXTERNAL_FILTER_PASS: 'doesExternalFilterPass';
    static PROP_FLOATING_FILTERS_HEIGHT: 'floatingFiltersHeight';
    static PROP_SUPPRESS_ROW_CLICK_SELECTION: 'suppressRowClickSelection';
    static PROP_SUPPRESS_ROW_DRAG: 'suppressRowDrag';
    static PROP_SUPPRESS_MOVE_WHEN_ROW_DRAG: 'suppressMoveWhenRowDragging';
    static PROP_GET_ROW_CLASS: 'getRowClass';
    static PROP_GET_ROW_STYLE: 'getRowStyle';
    static PROP_GET_ROW_HEIGHT: 'getRowHeight';
    static PROP_POPUP_PARENT: 'popupParent';
    static PROP_DOM_LAYOUT: 'domLayout';
    static PROP_ROW_CLASS: 'rowClass';
    static PROP_FILL_HANDLE_DIRECTION: 'fillHandleDirection';
    static PROP_GROUP_ROW_AGG_NODES: 'groupRowAggNodes';
    static PROP_GET_GROUP_ROW_AGG: 'getGroupRowAgg';
    static PROP_GET_BUSINESS_KEY_FOR_NODE: 'getBusinessKeyForNode';
    static PROP_GET_CHILD_COUNT: 'getChildCount';
    static PROP_PROCESS_ROW_POST_CREATE: 'processRowPostCreate';
    static PROP_GET_ROW_NODE_ID: 'getRowNodeId';
    static PROP_GET_ROW_ID: 'getRowId';
    static PROP_IS_FULL_WIDTH_CELL: 'isFullWidthCell';
    static PROP_IS_FULL_WIDTH_ROW: 'isFullWidthRow';
    static PROP_IS_ROW_SELECTABLE: 'isRowSelectable';
    static PROP_IS_ROW_MASTER: 'isRowMaster';
    static PROP_POST_SORT: 'postSort';
    static PROP_POST_SORT_ROWS: 'postSortRows';
    static PROP_GET_DOCUMENT: 'getDocument';
    static PROP_POST_PROCESS_POPUP: 'postProcessPopup';
    static PROP_DEFAULT_GROUP_ORDER_COMPARATOR: 'defaultGroupOrderComparator';
    static PROP_INITIAL_GROUP_ORDER_COMPARATOR: 'initialGroupOrderComparator';
    static PROP_PAGINATION_NUMBER_FORMATTER: 'paginationNumberFormatter';
    static PROP_GET_CONTEXT_MENU_ITEMS: 'getContextMenuItems';
    static PROP_GET_MAIN_MENU_ITEMS: 'getMainMenuItems';
    static PROP_PROCESS_CELL_FOR_CLIPBOARD: 'processCellForClipboard';
    static PROP_PROCESS_CELL_FROM_CLIPBOARD: 'processCellFromClipboard';
    static PROP_SEND_TO_CLIPBOARD: 'sendToClipboard';
    static PROP_PROCESS_PIVOT_RESULT_COL_DEF: 'processPivotResultColDef';
    static PROP_PROCESS_PIVOT_RESULT_COL_GROUP_DEF: 'processPivotResultColGroupDef';
    static PROP_GET_CHART_TOOLBAR_ITEMS: 'getChartToolbarItems';
    static PROP_GET_SERVER_SIDE_GROUP_PARAMS: 'getServerSideGroupLevelParams';
    static PROP_IS_SERVER_SIDE_GROUPS_OPEN_BY_DEFAULT: 'isServerSideGroupOpenByDefault';
    static PROP_IS_APPLY_SERVER_SIDE_TRANSACTION: 'isApplyServerSideTransaction';
    static PROP_IS_SERVER_SIDE_GROUP: 'isServerSideGroup';
    static PROP_GET_SERVER_SIDE_GROUP_KEY: 'getServerSideGroupKey';
    private readonly gridOptions;
    private readonly eventService;
    private readonly environment;
    private eGridDiv;
    private propertyEventService;
    private domDataKey;
    private scrollbarWidth;
    private destroyed;
    private agWire;
    private destroy;
    init(): void;
    private checkColumnDefProperties;
    private checkGridOptionsProperties;
    private checkProperties;
    /**
    * Wrap the user callback and attach the api, columnApi and context to the params object on the way through.
    * @param callback User provided callback
    * @returns Wrapped callback where the params object not require api, columnApi and context
    */
    private mergeGridCommonParams;
    getDomDataKey(): string;
    getDomData(element: Node | null, key: string): any;
    setDomData(element: Element, key: string, value: any): any;
    isRowSelection(): boolean;
    isSuppressRowDeselection(): boolean;
    isRowSelectionMulti(): boolean;
    isRowMultiSelectWithClick(): boolean;
    getContext(): any;
    isPivotMode(): boolean;
    isSuppressExpandablePivotGroups(): boolean;
    getPivotColumnGroupTotals(): string | undefined;
    getPivotRowTotals(): string | undefined;
    isRowModelInfinite(): boolean;
    isRowModelViewport(): boolean;
    isRowModelServerSide(): boolean;
    isRowModelDefault(): boolean;
    isFullRowEdit(): boolean;
    isSuppressFocusAfterRefresh(): boolean;
    isSuppressBrowserResizeObserver(): boolean;
    isSuppressMaintainUnsortedOrder(): boolean;
    isSuppressClearOnFillReduction(): boolean;
    isShowToolPanel(): boolean;
    getSideBar(): SideBarDef;
    isSuppressTouch(): boolean;
    isMaintainColumnOrder(): boolean;
    isSuppressRowTransform(): boolean;
    isSuppressColumnStateEvents(): boolean;
    isAllowDragFromColumnsToolPanel(): boolean;
    useAsyncEvents(): boolean;
    isEnableCellChangeFlash(): boolean;
    getCellFlashDelay(): number;
    getCellFadeDelay(): number;
    isGroupSelectsChildren(): boolean;
    isSuppressRowHoverHighlight(): boolean;
    isColumnHoverHighlight(): boolean;
    isGroupSelectsFiltered(): boolean;
    isGroupHideOpenParents(): boolean;
    isGroupMaintainOrder(): boolean;
    getAutoGroupColumnDef(): ColDef | undefined;
    isColumnsSortingCoupledToGroup(): boolean;
    isGroupMultiAutoColumn(): boolean;
    isGroupUseEntireRow(pivotMode: boolean): boolean;
    isGroupRowsSticky(): boolean;
    isGroupSuppressAutoColumn(): boolean;
    isGroupRemoveSingleChildren(): boolean;
    isGroupRemoveLowestSingleChildren(): boolean;
    isGroupIncludeFooter(): boolean;
    isGroupIncludeTotalFooter(): boolean;
    isGroupSuppressBlankHeader(): boolean;
    isSuppressRowClickSelection(): boolean;
    isSuppressCellFocus(): boolean;
    isSuppressMultiSort(): boolean;
    isAlwaysMultiSort(): boolean;
    isMultiSortKeyCtrl(): boolean;
    isPivotSuppressAutoColumn(): boolean;
    isSuppressDragLeaveHidesColumns(): boolean;
    isSuppressRowGroupHidesColumns(): boolean;
    isSuppressScrollOnNewData(): boolean;
    isSuppressScrollWhenPopupsAreOpen(): boolean;
    isRowDragEntireRow(): boolean;
    isSuppressRowDrag(): boolean;
    isRowDragManaged(): boolean;
    isSuppressMoveWhenRowDragging(): boolean;
    isRowDragMultiRow(): boolean;
    getDomLayout(): string;
    isSuppressHorizontalScroll(): boolean;
    isSuppressMaxRenderedRowRestriction(): boolean;
    isExcludeChildrenWhenTreeDataFiltering(): boolean;
    isAlwaysShowHorizontalScroll(): boolean;
    isAlwaysShowVerticalScroll(): boolean;
    isDebounceVerticalScrollbar(): boolean;
    isSuppressLoadingOverlay(): boolean;
    isSuppressNoRowsOverlay(): boolean;
    isSuppressFieldDotNotation(): boolean;
    getPinnedTopRowData(): any[] | undefined;
    getPinnedBottomRowData(): any[] | undefined;
    isFunctionsPassive(): boolean;
    isSuppressChangeDetection(): boolean;
    isSuppressAnimationFrame(): boolean;
    getQuickFilterText(): string | undefined;
    isCacheQuickFilter(): boolean;
    isUnSortIcon(): boolean;
    isSuppressMenuHide(): boolean;
    isEnterMovesDownAfterEdit(): boolean;
    isEnterMovesDown(): boolean;
    isUndoRedoCellEditing(): boolean;
    getUndoRedoCellEditingLimit(): number | undefined;
    getRowStyle(): import("./entities/gridOptions").RowStyle | undefined;
    getRowClass(): string | string[] | undefined;
    getRowStyleFunc(): ((params: Pick<import("./entities/gridOptions").RowClassParams<any>, "data" | "rowIndex" | "node">) => import("./entities/gridOptions").RowStyle | undefined) | undefined;
    getRowClassFunc(): ((params: Pick<import("./entities/gridOptions").RowClassParams<any>, "data" | "rowIndex" | "node">) => string | string[] | undefined) | undefined;
    rowClassRules(): import("./entities/gridOptions").RowClassRules<any> | undefined;
    isServerSideInfiniteScroll(): boolean;
    getServerSideGroupLevelParamsFunc(): ((params: Pick<import("./entities/iCallbackParams").GetServerSideGroupLevelParamsParams, "level" | "pivotMode" | "parentRowNode" | "rowGroupColumns" | "pivotColumns">) => import("./entities/gridOptions").ServerSideGroupLevelParams) | undefined;
    getCreateChartContainerFunc(): ((params: Pick<import("./entities/gridOptions").ChartRefParams<any>, "chart" | "chartId" | "chartElement" | "destroyChart">) => void) | undefined;
    getPopupParent(): HTMLElement | undefined;
    getBlockLoadDebounceMillis(): number | undefined;
    getPostProcessPopupFunc(): ((params: Pick<import("./entities/iCallbackParams").PostProcessPopupParams<any>, "type" | "column" | "ePopup" | "rowNode" | "eventSource" | "mouseEvent">) => void) | undefined;
    getPaginationNumberFormatterFunc(): ((params: Pick<import("./entities/iCallbackParams").PaginationNumberFormatterParams<any>, "value">) => string) | undefined;
    getChildCountFunc(): ((dataItem: any) => number) | undefined;
    getIsApplyServerSideTransactionFunc(): ((params: Pick<import("./entities/iCallbackParams").IsApplyServerSideTransactionParams, "transaction" | "parentNode" | "storeInfo" | "groupLevelInfo">) => boolean) | undefined;
    getInitialGroupOrderComparator(): ((params: Pick<InitialGroupOrderComparatorParams<any>, "nodeA" | "nodeB">) => number) | undefined;
    getIsFullWidthCellFunc(): ((params: Pick<IsFullWidthRowParams<any>, "rowNode">) => boolean) | undefined;
    getFullWidthCellRendererParams(): any;
    isEmbedFullWidthRows(): boolean;
    isDetailRowAutoHeight(): boolean;
    getSuppressKeyboardEventFunc(): ((params: SuppressKeyboardEventParams) => boolean) | undefined;
    getBusinessKeyForNodeFunc(): ((node: RowNode<any>) => string) | undefined;
    getApi(): GridApi | undefined | null;
    getColumnApi(): ColumnApi | undefined | null;
    isReadOnlyEdit(): boolean;
    isImmutableData(): boolean;
    isEnsureDomOrder(): boolean;
    isEnableCharts(): boolean;
    getColResizeDefault(): string | undefined;
    isSingleClickEdit(): boolean;
    isSuppressClickEdit(): boolean;
    isStopEditingWhenCellsLoseFocus(): boolean;
    getGroupDefaultExpanded(): number | undefined;
    getMaxConcurrentDatasourceRequests(): number | undefined;
    getMaxBlocksInCache(): number | undefined;
    getCacheOverflowSize(): number | undefined;
    getPaginationPageSize(): number | undefined;
    isPaginateChildRows(): boolean;
    getCacheBlockSize(): number | undefined;
    getInfiniteInitialRowCount(): number | undefined;
    getServerSideInitialRowCount(): number;
    isPurgeClosedRowNodes(): boolean;
    isSuppressPaginationPanel(): boolean;
    getRowData(): any[] | undefined | null;
    isEnableRtl(): boolean;
    getRowGroupPanelShow(): string | undefined;
    getPivotPanelShow(): string | undefined;
    isAngularCompileRows(): boolean;
    isAngularCompileFilters(): boolean;
    isDebug(): boolean;
    getColumnDefs(): (ColDef<any> | ColGroupDef<any>)[] | null | undefined;
    getColumnTypes(): {
        [key: string]: ColDef;
    } | undefined;
    getDatasource(): IDatasource | undefined;
    getViewportDatasource(): IViewportDatasource | undefined;
    getServerSideDatasource(): IServerSideDatasource | undefined;
    isAccentedSort(): boolean;
    isEnableBrowserTooltips(): boolean;
    isEnableCellExpressions(): boolean;
    isEnableGroupEdit(): boolean;
    isSuppressMiddleClickScrolls(): boolean;
    isPreventDefaultOnContextMenu(): boolean;
    isSuppressPreventDefaultOnMouseWheel(): boolean;
    isSuppressColumnVirtualisation(): boolean;
    isSuppressRowVirtualisation(): boolean;
    isSuppressContextMenu(): boolean;
    isAllowContextMenuWithControlKey(): boolean;
    isSuppressCopyRowsToClipboard(): boolean;
    isSuppressCopySingleCellRanges(): boolean;
    isCopyHeadersToClipboard(): boolean;
    isCopyGroupHeadersToClipboard(): boolean;
    isSuppressClipboardPaste(): boolean;
    isSuppressLastEmptyLineOnPaste(): boolean;
    isPagination(): boolean;
    isSuppressEnterpriseResetOnNewColumns(): boolean;
    getProcessDataFromClipboardFunc(): ((params: Pick<import("./entities/iCallbackParams").ProcessDataFromClipboardParams<any>, "data">) => string[][] | null) | undefined;
    getAsyncTransactionWaitMillis(): number | undefined;
    isSuppressMovableColumns(): boolean;
    isAnimateRows(): boolean;
    isSuppressColumnMoveAnimation(): boolean;
    isSuppressAggFuncInHeader(): boolean;
    isSuppressAggAtRootLevel(): boolean;
    isSuppressAggFilteredOnly(): boolean;
    isRemovePivotHeaderRowWhenSingleValueColumn(): boolean;
    isShowOpenedGroup(): boolean;
    isReactUi(): boolean;
    isSuppressReactUi(): boolean;
    isEnableRangeSelection(): boolean;
    isEnableRangeHandle(): boolean;
    isEnableFillHandle(): boolean;
    getFillHandleDirection(): 'x' | 'y' | 'xy';
    getFillOperation(): ((params: Pick<import("./entities/iCallbackParams").FillOperationParams<any>, "column" | "rowNode" | "event" | "direction" | "values" | "initialValues" | "currentIndex" | "currentCellValue">) => any) | undefined;
    isSuppressMultiRangeSelection(): boolean;
    isPaginationAutoPageSize(): boolean;
    isRememberGroupStateWhenNewData(): boolean;
    getIcons(): {
        [key: string]: TimerHandler;
    } | undefined;
    getGroupAggFiltering(): ((params: WithoutGridCommon<GetGroupAggFilteringParams>) => boolean) | undefined;
    getAggFuncs(): {
        [key: string]: IAggFunc;
    } | undefined;
    getSortingOrder(): ('asc' | 'desc' | null)[] | undefined;
    getAlignedGrids(): {
        api?: GridApi | null;
        columnApi?: ColumnApi | null;
    }[] | undefined;
    isMasterDetail(): boolean;
    isKeepDetailRows(): boolean;
    getKeepDetailRowsCount(): number | undefined;
    getIsRowMasterFunc(): import("./entities/gridOptions").IsRowMaster<any> | undefined;
    getIsRowSelectableFunc(): import("./entities/gridOptions").IsRowSelectable<any> | undefined;
    getGroupRowRendererParams(): any;
    getOverlayLoadingTemplate(): string | undefined;
    getOverlayNoRowsTemplate(): string | undefined;
    isSuppressAutoSize(): boolean;
    isEnableCellTextSelection(): boolean;
    isSuppressParentsInRowNodes(): boolean;
    isSuppressClipboardApi(): boolean;
    isFunctionsReadOnly(): boolean;
    isEnableCellTextSelect(): boolean;
    getDefaultColDef(): ColDef | undefined;
    getDefaultColGroupDef(): Partial<ColGroupDef> | undefined;
    getDefaultExportParams(type: 'csv'): CsvExportParams | undefined;
    getDefaultExportParams(type: 'excel'): ExcelExportParams | undefined;
    isSuppressCsvExport(): boolean;
    isAllowShowChangeAfterFilter(): boolean;
    isSuppressExcelExport(): boolean;
    isSuppressMakeColumnVisibleAfterUnGroup(): boolean;
    getDataPathFunc(): ((dataItem: any) => string[]) | undefined;
    getIsServerSideGroupFunc(): ((dataItem: any) => boolean) | undefined;
    getIsServerSideGroupOpenByDefaultFunc(): ((params: Pick<import("./entities/iCallbackParams").IsServerSideGroupOpenByDefaultParams, "data" | "rowNode">) => boolean) | undefined;
    getIsGroupOpenByDefaultFunc(): ((params: Pick<import("./entities/iCallbackParams").IsGroupOpenByDefaultParams<any>, "level" | "field" | "rowNode" | "key" | "rowGroupColumn">) => boolean) | undefined;
    getServerSideGroupKeyFunc(): ((dataItem: any) => string) | undefined;
    getGroupRowAggFunc(): ((params: Pick<GetGroupRowAggParams<any>, "nodes">) => any) | undefined;
    getContextMenuItemsFunc(): ((params: Pick<import("./entities/iCallbackParams").GetContextMenuItemsParams<any>, "value" | "column" | "node" | "defaultItems">) => (string | import("./entities/gridOptions").MenuItemDef)[]) | undefined;
    getMainMenuItemsFunc(): ((params: Pick<import("./entities/iCallbackParams").GetMainMenuItemsParams<any>, "column" | "defaultItems">) => (string | import("./entities/gridOptions").MenuItemDef)[]) | undefined;
    getRowIdFunc(): ((params: Pick<GetRowIdParams<any>, "data" | "level" | "parentKeys">) => string) | undefined;
    getNavigateToNextHeaderFunc(): ((params: Pick<import("./entities/iCallbackParams").NavigateToNextHeaderParams<any>, "key" | "event" | "previousHeaderPosition" | "nextHeaderPosition" | "headerRowCount">) => import("./main").HeaderPosition | null) | undefined;
    getTabToNextHeaderFunc(): ((params: Pick<import("./entities/iCallbackParams").TabToNextHeaderParams<any>, "backwards" | "previousHeaderPosition" | "nextHeaderPosition" | "headerRowCount">) => import("./main").HeaderPosition | null) | undefined;
    getNavigateToNextCellFunc(): ((params: Pick<import("./entities/iCallbackParams").NavigateToNextCellParams<any>, "previousCellPosition" | "nextCellPosition" | "key" | "event">) => import("./main").CellPosition | null) | undefined;
    getTabToNextCellFunc(): ((params: Pick<import("./entities/iCallbackParams").TabToNextCellParams<any>, "backwards" | "editing" | "previousCellPosition" | "nextCellPosition">) => import("./main").CellPosition | null) | undefined;
    getGridTabIndex(): string;
    isTreeData(): boolean;
    isValueCache(): boolean;
    isValueCacheNeverExpires(): boolean;
    isDeltaSort(): boolean;
    isAggregateOnlyChangedColumns(): boolean;
    getProcessPivotResultColDefFunc(): ((colDef: ColDef<any>) => void) | undefined;
    getProcessPivotResultColGroupDefFunc(): ((colGroupDef: ColGroupDef<any>) => void) | undefined;
    getSendToClipboardFunc(): ((params: Pick<import("./entities/iCallbackParams").SendToClipboardParams<any>, "data">) => void) | undefined;
    getProcessRowPostCreateFunc(): ((params: Pick<import("./entities/iCallbackParams").ProcessRowParams<any>, "rowIndex" | "node" | "eRow" | "ePinnedLeftRow" | "ePinnedRightRow" | "addRenderedRowListener">) => void) | undefined;
    getProcessCellForClipboardFunc(): ((params: Pick<import("./interfaces/exportParams").ProcessCellForExportParams<any>, "type" | "value" | "column" | "node" | "accumulatedRowIndex">) => any) | undefined;
    getProcessHeaderForClipboardFunc(): ((params: Pick<import("./interfaces/exportParams").ProcessHeaderForExportParams<any>, "column">) => any) | undefined;
    getProcessGroupHeaderForClipboardFunc(): ((params: Pick<import("./interfaces/exportParams").ProcessGroupHeaderForExportParams<any>, "columnGroup">) => any) | undefined;
    getProcessCellFromClipboardFunc(): ((params: Pick<import("./interfaces/exportParams").ProcessCellForExportParams<any>, "type" | "value" | "column" | "node" | "accumulatedRowIndex">) => any) | undefined;
    getViewportRowModelPageSize(): number | undefined;
    getViewportRowModelBufferSize(): number;
    isServerSideSortAllLevels(): boolean;
    isServerSideFilterAllLevels(): boolean;
    isServerSideSortOnServer(): boolean;
    isServerSideFilterOnServer(): boolean;
    getPostSortFunc(): ((params: Pick<PostSortRowsParams<any>, "nodes">) => void) | undefined;
    getChartToolbarItemsFunc(): ((params: Pick<import("./entities/iCallbackParams").GetChartToolbarItemsParams<any>, "defaultItems">) => import("./main").ChartMenuOptions[]) | undefined;
    getChartThemeOverrides(): AgChartThemeOverrides | undefined;
    getCustomChartThemes(): {
        [name: string]: AgChartTheme;
    } | undefined;
    getChartThemes(): string[];
    getClipboardDelimiter(): string;
    setProperty<K extends keyof GridOptions>(key: K, value: GridOptions[K], force?: boolean): void;
    addEventListener(key: string, listener: Function): void;
    removeEventListener(key: string, listener: Function): void;
    isSkipHeaderOnAutoSize(): boolean;
    getAutoSizePadding(): number;
    getHeaderHeight(): number | null | undefined;
    getFloatingFiltersHeight(): number | null | undefined;
    getGroupHeaderHeight(): number | null | undefined;
    getPivotHeaderHeight(): number | null | undefined;
    getPivotGroupHeaderHeight(): number | null | undefined;
    isExternalFilterPresent(): boolean;
    doesExternalFilterPass(node: RowNode): boolean;
    getTooltipDelay(type: 'show' | 'hide'): number | null;
    isTooltipMouseTrack(): boolean;
    isSuppressModelUpdateAfterUpdateTransaction(): boolean;
    getDocument(): Document;
    getMinColWidth(): number;
    getMaxColWidth(): number | null;
    getColWidth(): number;
    getRowBuffer(): number;
    getRowBufferInPixels(): number;
    getScrollbarWidth(): number;
    private checkForDeprecated;
    private checkForViolations;
    private treeDataViolations;
    getLocaleTextFunc(): (key: string, defaultValue: string, variableValues?: string[]) => string;
    globalEventHandler(eventName: string, event?: any): void;
    private setRowHeightVariable;
    getRowHeightAsNumber(): number;
    isGetRowHeightFunction(): boolean;
    getRowHeightForNode(rowNode: RowNode, allowEstimate?: boolean, defaultRowHeight?: number): {
        height: number;
        estimated: boolean;
    };
    isDynamicRowHeight(): boolean;
    getListItemHeight(): number;
    chartMenuPanelWidth(): number | undefined;
    private isNumeric;
    private getFromTheme;
    getDefaultRowHeight(): number;
    private matchesGroupDisplayType;
    private matchesTreeDataDisplayType;
}
