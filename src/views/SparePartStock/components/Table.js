import React, { useCallback } from 'react'

import { Table, Popconfirm } from 'antd'

import Button from '@/components/Button'

import styles from './Table.module.less'

const { Column } = Table

export default ({ onEdit, onDelete, onChange, ...rest }) => {
  // 过滤掉一些多余数据
  const handleChange = useCallback(
    pagination => {
      typeof onChange === 'function' && onChange(pagination)
    },
    [onChange]
  )

  return (
    <div className={styles['table-container']}>
      <Table {...rest} onChange={handleChange}>
        <Column title="名称" dataIndex="name" align="center" />
        <Column title="备件类型" dataIndex="typeText" align="center" />
        <Column title="品牌" dataIndex="brand" align="center" />
        <Column title="库存量" dataIndex="count" align="center" />
        <Column title="型号" dataIndex="model" align="center" />
        <Column title="备注" dataIndex="markNote" align="center" />
        <Column
          title="操作"
          key="action"
          align="center"
          render={row => {
            return (
              <span>
                <Button onClick={() => onEdit(row)} type="primary" className={styles['m-r-35']}>
                  编辑
                </Button>
                <Popconfirm
                  title="是否要删除该条备件信息?"
                  onConfirm={() => onDelete({ id: row.id })}
                >
                  <Button type="danger">删除</Button>
                </Popconfirm>
              </span>
            )
          }}
        />
      </Table>
    </div>
  )
}
