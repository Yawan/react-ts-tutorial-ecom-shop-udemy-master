import * as React from "react"
import { logErrorToMyService } from "../../utils/helper"

export interface IHandleAllErrorProps {}

export interface IHandleAllErrorState {
  hasError: boolean
}

export default class HandleAllError extends React.Component<
  IHandleAllErrorProps,
  IHandleAllErrorState
> {
  constructor(props: IHandleAllErrorProps) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 以至於下一個 render 會顯示 fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    logErrorToMyService(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Sorry, something went wrong, please try it later.</h1>
    }
    return this.props.children
  }
}
