var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { _, Autowired, Bean, BeanStub, ColumnGroup, Constants, GroupInstanceIdCreator } from "@ag-grid-community/core";
export var RowType;
(function (RowType) {
    RowType[RowType["HEADER_GROUPING"] = 0] = "HEADER_GROUPING";
    RowType[RowType["HEADER"] = 1] = "HEADER";
    RowType[RowType["BODY"] = 2] = "BODY";
})(RowType || (RowType = {}));
let GridSerializer = class GridSerializer extends BeanStub {
    serialize(gridSerializingSession, params = {}) {
        const columnsToExport = this.getColumnsToExport(params.allColumns, params.columnKeys);
        const serializeChain = _.compose(
        // first pass, put in the header names of the cols
        this.prepareSession(columnsToExport), this.prependContent(params), this.exportColumnGroups(params, columnsToExport), this.exportHeaders(params, columnsToExport), this.processPinnedTopRows(params, columnsToExport), this.processRows(params, columnsToExport), this.processPinnedBottomRows(params, columnsToExport), this.appendContent(params));
        return serializeChain(gridSerializingSession).parse();
    }
    processRow(gridSerializingSession, params, columnsToExport, node) {
        const rowSkipper = params.shouldRowBeSkipped || (() => false);
        const gridOptionsWrapper = this.gridOptionsWrapper;
        const context = gridOptionsWrapper.getContext();
        const api = gridOptionsWrapper.getApi();
        const columnApi = gridOptionsWrapper.getColumnApi();
        const skipSingleChildrenGroup = gridOptionsWrapper.isGroupRemoveSingleChildren();
        const skipLowestSingleChildrenGroup = gridOptionsWrapper.isGroupRemoveLowestSingleChildren();
        // if onlySelected, we ignore groupHideOpenParents as the user has explicitly selected the rows they wish to export.
        // similarly, if specific rowNodes are provided we do the same. (the clipboard service uses rowNodes to define which rows to export)
        const isClipboardExport = params.rowPositions != null;
        const isExplicitExportSelection = isClipboardExport || !!params.onlySelected;
        const hideOpenParents = gridOptionsWrapper.isGroupHideOpenParents() && !isExplicitExportSelection;
        const isLeafNode = this.columnModel.isPivotMode() ? node.leafGroup : !node.group;
        const skipRowGroups = params.skipGroups || params.skipRowGroups;
        const shouldSkipLowestGroup = skipLowestSingleChildrenGroup && node.leafGroup;
        const shouldSkipCurrentGroup = node.allChildrenCount === 1 && (skipSingleChildrenGroup || shouldSkipLowestGroup);
        if (skipRowGroups && params.skipGroups) {
            _.doOnce(() => console.warn('AG Grid: Since v25.2 `skipGroups` has been renamed to `skipRowGroups`.'), 'gridSerializer-skipGroups');
        }
        if ((!isLeafNode && (params.skipRowGroups || shouldSkipCurrentGroup || hideOpenParents)) ||
            (params.onlySelected && !node.isSelected()) ||
            (params.skipPinnedTop && node.rowPinned === 'top') ||
            (params.skipPinnedBottom && node.rowPinned === 'bottom')) {
            return;
        }
        // if we are in pivotMode, then the grid will show the root node only
        // if it's not a leaf group
        const nodeIsRootNode = node.level === -1;
        if (nodeIsRootNode && !node.leafGroup && (!node.footer || !isClipboardExport)) {
            return;
        }
        const shouldRowBeSkipped = rowSkipper({ node, api, columnApi, context });
        if (shouldRowBeSkipped) {
            return;
        }
        const rowAccumulator = gridSerializingSession.onNewBodyRow();
        columnsToExport.forEach((column, index) => {
            rowAccumulator.onColumn(column, index, node);
        });
        if (params.getCustomContentBelowRow) {
            const content = params.getCustomContentBelowRow({ node, api, columnApi, context });
            if (content) {
                gridSerializingSession.addCustomContent(content);
            }
        }
    }
    appendContent(params) {
        return (gridSerializingSession) => {
            const appendContent = params.customFooter || params.appendContent;
            if (appendContent) {
                if (params.customFooter) {
                    _.doOnce(() => console.warn('AG Grid: Since version 25.2.0 the `customFooter` param has been deprecated. Use `appendContent` instead.'), 'gridSerializer-customFooter');
                }
                gridSerializingSession.addCustomContent(appendContent);
            }
            return gridSerializingSession;
        };
    }
    prependContent(params) {
        return (gridSerializingSession) => {
            const prependContent = params.customHeader || params.prependContent;
            if (prependContent) {
                if (params.customHeader) {
                    _.doOnce(() => console.warn('AG Grid: Since version 25.2.0 the `customHeader` param has been deprecated. Use `prependContent` instead.'), 'gridSerializer-customHeader');
                }
                gridSerializingSession.addCustomContent(prependContent);
            }
            return gridSerializingSession;
        };
    }
    prepareSession(columnsToExport) {
        return (gridSerializingSession) => {
            gridSerializingSession.prepare(columnsToExport);
            return gridSerializingSession;
        };
    }
    exportColumnGroups(params, columnsToExport) {
        return (gridSerializingSession) => {
            if (!params.skipColumnGroupHeaders) {
                const groupInstanceIdCreator = new GroupInstanceIdCreator();
                const displayedGroups = this.displayedGroupCreator.createDisplayedGroups(columnsToExport, this.columnModel.getGridBalancedTree(), groupInstanceIdCreator, null);
                this.recursivelyAddHeaderGroups(displayedGroups, gridSerializingSession, params.processGroupHeaderCallback);
            }
            else if (params.columnGroups) {
                _.doOnce(() => console.warn('AG Grid: Since v25.2 the `columnGroups` param has deprecated, and groups are exported by default.'), 'gridSerializer-columnGroups');
            }
            return gridSerializingSession;
        };
    }
    exportHeaders(params, columnsToExport) {
        return (gridSerializingSession) => {
            if (!params.skipHeader && !params.skipColumnHeaders) {
                const gridRowIterator = gridSerializingSession.onNewHeaderRow();
                columnsToExport.forEach((column, index) => {
                    gridRowIterator.onColumn(column, index, undefined);
                });
            }
            else if (params.skipHeader) {
                _.doOnce(() => console.warn('AG Grid: Since v25.2 the `skipHeader` param has been renamed to `skipColumnHeaders`.'), 'gridSerializer-skipHeader');
            }
            return gridSerializingSession;
        };
    }
    processPinnedTopRows(params, columnsToExport) {
        return (gridSerializingSession) => {
            const processRow = this.processRow.bind(this, gridSerializingSession, params, columnsToExport);
            this.pinnedRowModel.forEachPinnedTopRow(processRow);
            return gridSerializingSession;
        };
    }
    processRows(params, columnsToExport) {
        return (gridSerializingSession) => {
            // when in pivot mode, we always render cols on screen, never 'all columns'
            const rowModel = this.rowModel;
            const rowModelType = rowModel.getType();
            const usingCsrm = rowModelType === Constants.ROW_MODEL_TYPE_CLIENT_SIDE;
            const usingSsrm = rowModelType === Constants.ROW_MODEL_TYPE_SERVER_SIDE;
            const onlySelectedNonStandardModel = !usingCsrm && params.onlySelected;
            const processRow = this.processRow.bind(this, gridSerializingSession, params, columnsToExport);
            if (params.rowPositions) {
                params.rowPositions
                    // pinnedRows are processed by `processPinnedTopRows` and `processPinnedBottomsRows`
                    .filter(position => position.rowPinned == null)
                    .sort((a, b) => a.rowIndex - b.rowIndex)
                    .map(position => rowModel.getRow(position.rowIndex))
                    .forEach(processRow);
            }
            else if (this.columnModel.isPivotMode()) {
                if (usingCsrm) {
                    rowModel.forEachPivotNode(processRow);
                }
                else {
                    // must be enterprise, so we can just loop through all the nodes
                    rowModel.forEachNode(processRow);
                }
            }
            else {
                // onlySelectedAllPages: user doing pagination and wants selected items from
                // other pages, so cannot use the standard row model as it won't have rows from
                // other pages.
                // onlySelectedNonStandardModel: if user wants selected in non standard row model
                // (eg viewport) then again RowModel cannot be used, so need to use selected instead.
                if (params.onlySelectedAllPages || onlySelectedNonStandardModel) {
                    const selectedNodes = this.selectionService.getSelectedNodes();
                    selectedNodes.forEach(processRow);
                }
                else {
                    // here is everything else - including standard row model and selected. we don't use
                    // the selection model even when just using selected, so that the result is the order
                    // of the rows appearing on the screen.
                    if (usingCsrm) {
                        rowModel.forEachNodeAfterFilterAndSort(processRow);
                    }
                    else if (usingSsrm) {
                        rowModel.forEachNodeAfterFilterAndSort(processRow);
                    }
                    else {
                        rowModel.forEachNode(processRow);
                    }
                }
            }
            return gridSerializingSession;
        };
    }
    processPinnedBottomRows(params, columnsToExport) {
        return (gridSerializingSession) => {
            const processRow = this.processRow.bind(this, gridSerializingSession, params, columnsToExport);
            this.pinnedRowModel.forEachPinnedBottomRow(processRow);
            return gridSerializingSession;
        };
    }
    getColumnsToExport(allColumns = false, columnKeys) {
        const isPivotMode = this.columnModel.isPivotMode();
        if (columnKeys && columnKeys.length) {
            return this.columnModel.getGridColumns(columnKeys);
        }
        if (allColumns && !isPivotMode) {
            // add auto group column for tree data
            const columns = this.gridOptionsWrapper.isTreeData()
                ? this.columnModel.getGridColumns([Constants.GROUP_AUTO_COLUMN_ID])
                : [];
            return columns.concat(this.columnModel.getAllPrimaryColumns() || []);
        }
        return this.columnModel.getAllDisplayedColumns();
    }
    recursivelyAddHeaderGroups(displayedGroups, gridSerializingSession, processGroupHeaderCallback) {
        const directChildrenHeaderGroups = [];
        displayedGroups.forEach((columnGroupChild) => {
            const columnGroup = columnGroupChild;
            if (!columnGroup.getChildren) {
                return;
            }
            columnGroup.getChildren().forEach(it => directChildrenHeaderGroups.push(it));
        });
        if (displayedGroups.length > 0 && displayedGroups[0] instanceof ColumnGroup) {
            this.doAddHeaderHeader(gridSerializingSession, displayedGroups, processGroupHeaderCallback);
        }
        if (directChildrenHeaderGroups && directChildrenHeaderGroups.length > 0) {
            this.recursivelyAddHeaderGroups(directChildrenHeaderGroups, gridSerializingSession, processGroupHeaderCallback);
        }
    }
    doAddHeaderHeader(gridSerializingSession, displayedGroups, processGroupHeaderCallback) {
        const gridRowIterator = gridSerializingSession.onNewHeaderGroupingRow();
        let columnIndex = 0;
        displayedGroups.forEach((columnGroupChild) => {
            const columnGroup = columnGroupChild;
            let name;
            if (processGroupHeaderCallback) {
                name = processGroupHeaderCallback({
                    columnGroup: columnGroup,
                    api: this.gridOptionsWrapper.getApi(),
                    columnApi: this.gridOptionsWrapper.getColumnApi(),
                    context: this.gridOptionsWrapper.getContext()
                });
            }
            else {
                name = this.columnModel.getDisplayNameForColumnGroup(columnGroup, 'header');
            }
            const collapsibleGroupRanges = columnGroup.getLeafColumns().reduce((collapsibleGroups, currentColumn, currentIdx, arr) => {
                let lastGroup = _.last(collapsibleGroups);
                const groupShow = currentColumn.getColumnGroupShow() === 'open';
                if (!groupShow) {
                    if (lastGroup && lastGroup[1] == null) {
                        lastGroup[1] = currentIdx - 1;
                    }
                }
                else if (!lastGroup || lastGroup[1] != null) {
                    lastGroup = [currentIdx];
                    collapsibleGroups.push(lastGroup);
                }
                if (currentIdx === arr.length - 1 && lastGroup && lastGroup[1] == null) {
                    lastGroup[1] = currentIdx;
                }
                return collapsibleGroups;
            }, []);
            gridRowIterator.onColumn(name || '', columnIndex++, columnGroup.getLeafColumns().length - 1, collapsibleGroupRanges);
        });
    }
};
__decorate([
    Autowired('displayedGroupCreator')
], GridSerializer.prototype, "displayedGroupCreator", void 0);
__decorate([
    Autowired('columnModel')
], GridSerializer.prototype, "columnModel", void 0);
__decorate([
    Autowired('rowModel')
], GridSerializer.prototype, "rowModel", void 0);
__decorate([
    Autowired('pinnedRowModel')
], GridSerializer.prototype, "pinnedRowModel", void 0);
__decorate([
    Autowired('selectionService')
], GridSerializer.prototype, "selectionService", void 0);
__decorate([
    Autowired('rowPositionUtils')
], GridSerializer.prototype, "rowPositionUtils", void 0);
GridSerializer = __decorate([
    Bean("gridSerializer")
], GridSerializer);
export { GridSerializer };
