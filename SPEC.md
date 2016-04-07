# blog编码规范

主要是约定一些比较常用的规范，与代码规范无关

## Style

1. 所有Component的根dom节点的`className`必须加上`comp-`前缀。

    解释：在组件内部的`className`可能会取一些通用的名称，如`.page`，
        这些名称可能与最外层名称冲突，因此在最外层做约定
