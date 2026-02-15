interface ErrorBannerProps {
  code: string;
  message: string;
}

/**
 * A banner component displaying an error message.
 *
 * @param {ErrorBannerProps} props - Error banner props.
 * @param {string} props.code - The error code.
 * @param {string} props.message - The error message.
 * @returns {JSX.Element} A JSX element representing the error banner.
 */
export function ErrorBanner({ code, message }: ErrorBannerProps) {
  return (
    <div
      className="border-error/40 bg-error/10 rounded-2xl border p-6"
      data-testid="error-banner"
    >
      <div className="flex items-center gap-4">
        <div className="text-error border-r-2 px-2 text-sm font-semibold">
          {code}
        </div>
        <div className="text-error flex-1 text-base">{message}</div>
      </div>
    </div>
  );
}
