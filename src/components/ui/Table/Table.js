import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Table = React.forwardRef((props, ref) => {
    const {
        borderlessRow,
        children,
        className,
        hoverable,
        compact,
        oveerflow = true,
        asElement: Component,
        ...rest
    } = props

    const tableClass = classNames(
        Component === 'table' ? 'table-default' : 'table-flex',
        hoverable && 'table-hover',
        compact && 'table-compact',
        borderlessRow && 'borderless-row',
        className
    )

    return (
        <div className={classNames(oveerflow && 'overflow-auto min-h-[60.5vh] max-h-[65vh]')}>
            <Component className={tableClass} {...rest} ref={ref}>
                {children}
            </Component>
        </div>
    )
})

Table.propTypes = {
    hoverable: PropTypes.bool,
    compact: PropTypes.bool,
    asElement: PropTypes.string,
    borderlessRow: PropTypes.bool,
}

Table.defaultProps = {
    hoverable: true,
    compact: false,
    asElement: 'table',
    borderlessRow: false,
}

export default Table