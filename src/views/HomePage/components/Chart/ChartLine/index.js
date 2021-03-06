import React from 'react'

import { useLine } from '../index'

import styles from './index.module.less'

export default ({ data }) => {
  const { domRef } = useLine(data)

  return <div ref={domRef} className={styles['chart']} />
}
