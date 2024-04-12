import React from 'react'
import PropTypes from 'prop-types' // check
import classNames from 'classnames' //check
import Card  from "../ui/Card";
// import { LAYOUT_TYPE_MODERN } from 'constants/theme.constant'
// import { useSelector } from 'react-redux'

const AdaptableCard = (props) => {
    const {
        className,
        children,
        bodyClass,
        leftSideBorder,
        rightSideBorder,
        divider,
        shadow,
        isLastChild,
        ...rest
    } = props
    
    return (
        <Card
            className = {classNames(className)}
            {...rest}
            bodyClass={classNames(bodyClass)}
        >
            {children}
        </Card>
    )
}

AdaptableCard.propTypes = {
    leftSideBorder: PropTypes.bool,
    rightSideBorder: PropTypes.bool,
    divider: PropTypes.bool,
    shadow: PropTypes.bool,
    isLastChild: PropTypes.bool,
}

export default AdaptableCard