/**
 * @typedef {Object} ColumnCell
 * @property {string} langLabel
 * @property {string} prop
 * @property {boolean} isFomatted
 * @property {string} formatMethod
 * @property {boolean} isCustom
 * @property {string} customKey
 * @property {string} customType
 * @property {string} width
 * @property {boolean} sortable
 * @property {boolean} resizable
 * @property {boolean} showOverflowTip
 * @property {string} type
 * @property {boolean} visible
 * @property {string} className
 * @property {string|boolean} fixed
 * @property {ColumnCell[]} children
 */
export default class ColumnCell {
    /**
     * @param {{
     *   langLabel: string,
     *   prop: string,
     *   isFomatted: boolean,
     *   formatMethod: string,
     *   isCustom: boolean,
     *   customKey: string,
     *   customType: string,
     *   width: string,
     *   sortable: boolean,
     *   resizable: boolean,
     *   showOverflowTip: boolean,
     *   type: string,
     *   visible: boolean,
     *   className: string,
     *   fixed: string|boolean,
     *   children: ColumnCell[]
     * }} param0 
     */
    constructor({
        langLabel,
        prop,
        isFomatted = false,
        formatMethod = '',
        isCustom = false,
        customKey = '',
        customType = '',
        width = '',
        sortable = false,
        resizable = true,
        showOverflowTip = true,
        type = '',
        visible = true,
        className = '',
        fixed = false, // 当且仅当false 表示不定位
        children = null,
    }){
        this.langLabel = langLabel;
        this.prop = prop;
        this.isFomatted = isFomatted;
        this.formatMethod = formatMethod;
        this.isCustom = isCustom;
        this.customKey = customKey;
        this.customType = customType;
        this.width = width;
        this.sortable = sortable;
        this.resizable = resizable;
        this.showOverflowTip = showOverflowTip;
        this.type = type;
        this.visible = visible;
        this.className = className;
        this.fixed = fixed;
        this.children = children; // 用於 isCustom = true
    }
}
/**
 * @param {{
 *   langLabel: string,
 *   prop: string,
 *   isFomatted: boolean,
 *   formatMethod: string,
 *   isCustom: boolean,
 *   customKey: string,
 *   customType: string,
 *   width: string,
 *   sortable: boolean,
 *   resizable: boolean,
 *   showOverflowTip: boolean,
 *   type: string,
 *   visible: boolean,
 *   className: string,
 *   fixed: string|boolean,
 *   children: ColumnCell[]
 * }} param0 
 * @returns {ColumnCell} 
 */
export function columnCellFactory({
    langLabel,
    prop,
    isFomatted = false,
    formatMethod = '',
    isCustom = false,
    customKey = '',
    customType = '',
    width = '',
    sortable = false,
    resizable = true,
    showOverflowTip = true,
    type = '',
    visible = true,
    className = '',
    fixed = false, // 当且仅当false 表示不定位
    children = null,
}) {
    return new ColumnCell({
        langLabel,
        prop,
        isFomatted,
        formatMethod,
        isCustom,
        customKey,
        customType,
        width,
        sortable,
        resizable,
        showOverflowTip,
        type,
        visible,
        className,
        fixed,
        children,
    })
}