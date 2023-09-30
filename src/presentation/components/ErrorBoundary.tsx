import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  handleOnError: () => void;
  handleErrorText: string;
}

interface ErrorBoundaryState {
  error: string;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: "" };
  }

  componentDidCatch(error: Error) {
    this.setState({ error: `${error.name}: ${error.message}` });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="flex flex-col h-screen w-screen items-center justify-center px-[24px]">
          <h1 className="font-bold text-lg mb-4">Error :(</h1>
          <p className="md:text-6xl w-full text-xs font-light text-slate-400">
            {error}
          </p>
          <button
            onClick={this.props.handleOnError}
            className="w-fit bg-teal-400 font-bold  px-4 py-2 rounded-sm hover:bg-teal-300 border-none mt-8"
          >
            {this.props.handleErrorText}
          </button>
        </div>
      );
    } else {
      return <h1>{this.props.children}</h1>;
    }
  }
}
