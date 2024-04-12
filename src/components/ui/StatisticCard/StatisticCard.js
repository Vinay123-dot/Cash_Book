import PropTypes from 'prop-types'
import classNames from 'classnames'

const StatisticCard = ({
    label,
    value,
    className,
    labelClassName,
    valueClassName,
}) => {
    return (
        <div className={classNames('flex flex-col', className)}>
            <label
                className={classNames(
                    'text-blue-600 text-lg font-medium tracking-wide mb-1',
                    labelClassName
                )}
            >
                {label}
            </label>
            <h4 className={classNames('text-2xl', valueClassName)}>{value}</h4>
        </div>
    )
}

StatisticCard.defaultProps = {
    label: 'label',
    value: 0,
}

StatisticCard.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any,
    className: PropTypes.string,
    labelClassName: PropTypes.string,
    valueClassName: PropTypes.string,
}

export default StatisticCard