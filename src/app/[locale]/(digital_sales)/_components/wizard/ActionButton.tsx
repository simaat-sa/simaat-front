import { Button } from "@/shared/components/ui/button";
import { useTranslations } from "next-intl";
import { useQuotePricingService } from "../../_services/QuotePricingService";

export default function ActionButton() {
  const { actionButton, currentWizard, onTakeAction } =
    useQuotePricingService();
  const t = useTranslations("sales");

  return (
    <div className="w-full flex justify-between items-center gap-4">
      <Button
        onClick={(e) => {
          e.preventDefault();
          onTakeAction();
        }}
        aria-label="register"
      >
        {actionButton === "get_code" ? t("get_code") : null}
        {actionButton === "check_code" ? t("check_code") : null}
        {actionButton === "next" ? t("next") : null}
        {actionButton === "confirm_pay" ? t("confirm_and_pay") : null}
      </Button>
      {currentWizard !== "quotes" ? (
        <Button
          onClick={(e) => {
            e.preventDefault();
            onTakeAction(true);
          }}
          aria-label="go back"
          variant="outline"
        >
          {t("back")}
        </Button>
      ) : null}
    </div>
  );
}
