import React, { useCallback, forwardRef } from 'react'

import { toJS } from 'mobx'
import { useObserver } from 'mobx-react-lite'

import { Form, Button } from 'antd'

import MonthPicker from './MonthPicker'

import styles from './SearchForm.module.less'

const MonthPickerForward = forwardRef(MonthPicker)

function SearchForm({ form, onSubmit }) {
  const { getFieldDecorator, getFieldsValue } = form

  const handleSubmit = useCallback(e => {
    e.preventDefault()

    onSubmit(getFieldsValue())
  }, [])

  return useObserver(() => (
    <Form className={styles['form-container']} onSubmit={handleSubmit} layout="inline">
      <Form.Item label="发布时间">
        {getFieldDecorator('rangePicker')(<MonthPickerForward />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>
  ))
}

const WrappedSearchForm = Form.create({
  mapPropsToFields(props) {
    const { rangePicker } = props.value

    // toJS 为了处理空数组时，antd RangePicker 访问数组 0，1 时，mobx 警告信息的问题
    return {
      rangePicker: Form.createFormField({ value: toJS(rangePicker) }),
    }
  },
  onValuesChange({ onChange }, changedValues, { ...rest }) {
    onChange({ ...rest })
  },
})(SearchForm)

export default WrappedSearchForm
