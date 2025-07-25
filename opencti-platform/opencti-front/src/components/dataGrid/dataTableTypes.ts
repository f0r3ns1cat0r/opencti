/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import React from 'react';
import { GraphQLTaggedNode } from 'react-relay';
import { PopoverProps } from '@mui/material/Popover/Popover';
import { UsePreloadedPaginationFragment } from 'src/utils/hooks/usePreloadedPaginationFragment';
import { OperationType } from 'relay-runtime';
import type { LocalStorage } from '../../utils/hooks/useLocalStorageModel';
import { NumberOfElements, PaginationLocalStorage, UseLocalStorageHelpers } from '../../utils/hooks/useLocalStorage';
import { FilterGroup } from '../../utils/filters/filtersHelpers-types';

export type LocalStorageColumn = { percentWidth: number, visible?: boolean, index?: number };
export type LocalStorageColumns = Record<string, LocalStorageColumn>;

export enum DataTableVariant {
  default = 'default',
  inline = 'inline',
  widget = 'widget',
}

export interface UseDataTable<T = any> {
  data: T[]
  hasMore: () => boolean
  loadMore: (count: number, options?: Record<string, any>) => void
  isLoading: boolean
  isLoadingMore: () => boolean
}

export interface DataTableColumn {
  id: string
  isSortable?: boolean
  label?: string
  percentWidth: number
  render?: (v: any, helpers?: any, draftVersion?: boolean) => React.ReactNode
  visible?: boolean
  order: number
  lastX?: number
}

export type DataTableColumns = DataTableColumn[];

export interface DataTableContextProps {
  storageKey: string
  columns: DataTableColumns
  availableFilterKeys?: string[] | undefined;
  initialValues: DataTableProps['initialValues']
  setColumns: Dispatch<SetStateAction<DataTableColumns>>
  resolvePath: (data: any) => any
  redirectionModeEnabled?: boolean
  useLineData: DataTableProps['useLineData']
  dataQueryArgs: UsePreloadedPaginationFragment<OperationType>,
  data: unknown,
  useDataCellHelpers: DataTableProps['useDataCellHelpers']
  useDataTableToggle: ReturnType<DataTableProps['useDataTableToggle']>
  useComputeLink: (entity: any) => string | undefined
  useDataTableColumnsLocalStorage: ReturnType<DataTableProps['useDataTableColumnsLocalStorage']>
  useDataTablePaginationLocalStorage: ReturnType<DataTableProps['useDataTablePaginationLocalStorage']>
  onAddFilter: DataTableProps['onAddFilter']
  onSort: (sortBy: string, orderAsc: boolean) => void
  formatter: DataTableProps['formatter']
  variant: DataTableVariant
  actions?: DataTableProps['actions']
  icon?: DataTableProps['icon']
  rootRef?: DataTableProps['rootRef']
  createButton?: DataTableProps['createButton']
  resetColumns: () => void
  disableNavigation: DataTableProps['disableNavigation']
  disableToolBar: DataTableProps['disableToolBar']
  removeSelectAll: DataTableProps['removeSelectAll']
  disableLineSelection: DataTableProps['disableLineSelection']
  selectOnLineClick: DataTableProps['selectOnLineClick']
  onLineClick: DataTableProps['onLineClick']
  page: number
  setPage:Dispatch<SetStateAction<number>>
  tableWidthState: [number, Dispatch<SetStateAction<number>>]
  startsWithAction: boolean
  startsWithIcon: boolean
  startColumnWidth: number
  endsWithAction: boolean
  endsWithNavigate: boolean
}

export interface DataTableProps {
  dataColumns: Record<string, Partial<DataTableColumn>>
  resolvePath: (data: any) => any
  storageKey: string
  initialValues: LocalStorage
  toolbarFilters?: FilterGroup
  handleCopy?: () => void
  lineFragment?: GraphQLTaggedNode
  dataQueryArgs: any
  data?: unknown
  availableFilterKeys?: string[] | undefined;
  redirectionModeEnabled?: boolean
  additionalFilters?: FilterGroup
  additionalFilterKeys?: string[]
  entityTypes?: string[]
  settingsMessagesBannerHeight?: number
  storageHelpers?: UseLocalStorageHelpers
  redirectionMode?: string | undefined
  filtersComponent?: ReactNode
  dataTableToolBarComponent?: ReactNode
  numberOfElements?: NumberOfElements
  onAddFilter: (key: string) => void
  onSort?: (sortBy: string, orderAsc: boolean) => void
  formatter: Record<string, (args: any) => any>
  useDataTableColumnsLocalStorage: (
    key: string,
    initialValues?: LocalStorageColumns,
    ignoreUri?: boolean,
    ignoreDispatch?: boolean,
  ) => [LocalStorageColumns, Dispatch<SetStateAction<LocalStorageColumns>>]
  useDataTablePaginationLocalStorage: <T>(
    key: string,
    initialValue: LocalStorage,
    ignoreUri?: boolean,
  ) => PaginationLocalStorage<T>
  useComputeLink?: (entity: any) => string | undefined
  useDataTableToggle: (key: string) => {
    selectedElements: Record<string, any>
    deSelectedElements: Record<string, any>
    selectAll: boolean
    numberOfSelectedElements: number
    onToggleEntity: (entity: any, _?: React.MouseEvent, forceRemove?: any[]) => void
    handleClearSelectedElements: () => void
    handleToggleSelectAll: () => void
    setSelectedElements: (selectedElements: Record<string, any>) => void
  }
  useLineData: (row: any) => any
  useDataTable: (args: any) => any
  useDataCellHelpers: (cell: DataTableColumn) => any
  sortBy?: string | undefined
  orderAsc?: boolean | undefined
  variant?: DataTableVariant
  rootRef?: HTMLDivElement
  actions?: (row: any) => ReactNode
  icon?: (row: any) => ReactNode
  createButton?: ReactNode
  pageSize?: string
  disableNavigation?: boolean
  disableLineSelection?: boolean
  disableToolBar?: boolean
  removeSelectAll?: boolean
  removeAuthMembersEnabled?: boolean
  removeFromDraftEnabled?: boolean
  markAsReadEnabled?: boolean
  selectOnLineClick?: boolean
  onLineClick?: (line: any) => void
  hideHeaders?: boolean
  message?: string
  isLocalStorageEnabled?: boolean
}

export interface DataTableBodyProps {
  hasFilterComponent: boolean
  dataTableToolBarComponent?: ReactNode
  settingsMessagesBannerHeight?: DataTableProps['settingsMessagesBannerHeight']
  pageSize: number
  pageStart: number
  hideHeaders: DataTableProps['hideHeaders']
}

export interface DataTableDisplayFiltersProps {
  entityTypes?: string[]
  additionalFilterKeys?: string[]
  availableRelationFilterTypes?: Record<string, string[]> | undefined
  availableFilterKeys?: string[] | undefined;
  availableEntityTypes?: string[]
}

export interface DataTableFiltersProps {
  additionalFilters?: DataTableProps['additionalFilters'];
  availableFilterKeys?: string[] | undefined;
  availableRelationFilterTypes?: Record<string, string[]> | undefined
  availableEntityTypes?: string[]
  availableRelationshipTypes?: string[]
  searchContextFinal?: { entityTypes: string[]; elementId?: string[] | undefined; } | undefined
  exportContext?: { entity_type: string, entity_id?: string }
  paginationOptions: any
  currentView?: string
  additionalHeaderButtons?: ReactNode[]
}

export interface DataTableHeadersProps {
  dataTableToolBarComponent: ReactNode
}

export interface DataTableHeaderProps {
  column: DataTableColumn
  setAnchorEl: Dispatch<SetStateAction<PopoverProps['anchorEl']>>
  setActiveColumn: Dispatch<SetStateAction<DataTableColumn | undefined>>
  containerRef?: MutableRefObject<HTMLDivElement | null>
  sortBy: boolean
  orderAsc: boolean
  isActive?: boolean
}

export interface DataTableLineProps {
  row: any
  index: number
  onToggleShiftEntity: (currentIndex: number, currentEntity: { id: string }, event?: React.MouseEvent) => void
}

export interface DataTableCellProps {
  cell: DataTableColumn
  data: any
}
