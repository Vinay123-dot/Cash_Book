import React from 'react'
import classNames from 'classnames'
import { SlArrowRight } from 'react-icons/sl'

const Next = (props) => {
    const { currentPage, pageCount, pagerClass, onNext } = props

    const disabled = currentPage === pageCount || pageCount === 0

    const onNextClick = (e) => {
        e.preventDefault()
        if (disabled) {
            return
        }
        onNext(e)
    }

    const pagerNextClass = classNames(
        pagerClass.default,
        'pagination-pager-next',
        disabled ? pagerClass.disabled : pagerClass.inactive
    )

    return (
        <span className={pagerNextClass} onClick={onNextClick}>
            <SlArrowRight />
        </span>
    )
}

export default Next