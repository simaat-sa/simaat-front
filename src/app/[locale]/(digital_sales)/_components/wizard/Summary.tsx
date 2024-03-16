import InputBase from "@/shared/components/Inputs/InputBase";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCalcAmounts,
  useGetQuoteSelected,
  useQuotePricingService,
} from "../../_services/QuotePricingService";
import { paymentWay } from "../../_services/paymentWay";
import { quotesData } from "../../_services/quotesData";
import FooterSales from "../FooterSales";
import ActionButton from "./ActionButton";

const checkedIcon = "/assets/svg/icons/CheckBold.svg";
const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

export default function Summary() {
  const {
    quoteSelected,
    paymentMonths,
    promoCode,
    addons,
    promoCodeValid,
    promoCodeValue,
    onCheckPromoCode,
    onChange,
    onSelectPaymentWay,
  } = useQuotePricingService();
  const t = useTranslations("sales");
  const locale = useLocale();
  const { totalInvoice, totalTax } = useCalcAmounts();
  const getQuoteSelected = useGetQuoteSelected(quoteSelected!)!;

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-0 hidden grid-cols-1 lg:grid lg:grid-cols-2">
        <div className="col-span-1 bg-gray-100"></div>
        <div className="col-span-1"></div>
      </div>
      <div className="container relative z-10">
        <div className="grid h-full w-full grid-cols-2 gap-y-6 lg:gap-2">
          <div className="col-span-2 flex flex-col justify-center gap-4 px-4 md:px-2 lg:col-span-1 lg:h-full lg:px-0">
            <h2 className="mt-2 text-lg font-medium">
              {t("quote")} {t(getQuoteSelected.name as any)}
            </h2>
            <ul>
              {getQuoteSelected.features.map((feat, i) => (
                <li
                  key={feat}
                  className={cn("mb-4", {
                    "mb-0": getQuoteSelected.features.length - 1 === i,
                  })}
                >
                  <div className="flex flex-nowrap items-center gap-x-3">
                    <Image
                      src={checkedIcon}
                      alt={"checked"}
                      width={24}
                      height={24}
                    />
                    <Label className="text-lg font-medium">{feat}</Label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <div className="flex flex-1 flex-col justify-center gap-4">
                <h2 className="text-xl font-medium">{t("guarantee_title")}</h2>
                <p className="text-lg font-medium text-neutral-600">
                  {t("guarantee_subtitle")}
                </p>
              </div>
              <Image
                src="/assets/images/21-days-guarantee.svg"
                alt={t("guarantee_title")}
                width={170}
                height={170}
                loading="lazy"
              />
            </div>
            <h4 className="text-lg font-medium">{t("payment")}</h4>
            <div className="grid w-full grid-cols-4 gap-6 sm:w-4/5 md:w-3/5 lg:w-full lg:pl-6">
              {paymentWay.map((payment) => {
                const quote = quotesData.find(
                  (quote) => quote.id === getQuoteSelected.id,
                )!;
                return (
                  <div
                    key={payment.type}
                    className={cn(
                      "col-span-2 flex cursor-pointer flex-col items-center justify-center gap-6 rounded-xl border border-slate-50 bg-white p-3 shadow transition-colors duration-75 ease-in lg:col-span-1",
                      {
                        "border-primary-600": payment.months === paymentMonths,
                      },
                    )}
                    onClick={() => {
                      onSelectPaymentWay(payment.months);
                    }}
                  >
                    <span className="text-lg font-medium">
                      {payment.label[locale as "ar" | "en"]}
                    </span>
                    <div className="flex flex-nowrap items-center justify-center gap-2 align-baseline">
                      <span className="text-3xl">
                        {+quote.price * +payment.months || 0}
                      </span>
                      {t("s_r")}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full items-end gap-3 md:w-4/5 lg:w-full">
              <InputBase
                label={t("promo_code")}
                placeholder={t("promo_code")}
                value={promoCode}
                onChange={(e) => {
                  onChange("promoCode", e.target.value);
                }}
                disabled={promoCodeValid}
              />
              {!promoCodeValid ? (
                <Button variant="outline" onClick={() => onCheckPromoCode()}>
                  {t("apply")}
                </Button>
              ) : (
                <Image
                  src={checkedDecagramIcon}
                  width={24}
                  height={24}
                  alt="verified"
                  className="mb-3"
                  loading="lazy"
                />
              )}
            </div>
          </div>
          <div className="col-span-2 flex flex-col px-4 md:px-2 lg:col-span-1 lg:px-0">
            <div className="mx-auto flex w-full flex-1 flex-col justify-center gap-3 px-2 md:w-2/4 md:px-3 lg:w-3/5 lg:px-6">
              <h3 className="mb-8 text-3xl font-medium">
                {t("summary_order")}
              </h3>

              <h4 className="mt-3 text-lg font-medium">
                {t("quote")} {t(getQuoteSelected.name as any)}
              </h4>

              <ul className="flex w-full list-none flex-col gap-4 font-medium">
                <li className="flex justify-between">
                  <span>
                    {
                      paymentWay.find(
                        (payment) => payment.months === paymentMonths,
                      )?.label[locale as "ar" | "en"]
                    }
                  </span>
                  <span className="flex gap-2">
                    <span>{getQuoteSelected.price * paymentMonths}</span>
                    {t("s_r")}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span>
                    {t("tax", {
                      amount: 15,
                    })}
                  </span>
                  <span className="flex gap-2">
                    {totalTax} {t("s_r")}
                  </span>
                </li>

                {promoCodeValid ? (
                  <li className="flex justify-between">
                    <span>{t("promo_value")}</span>
                    <span className="flex gap-2 text-red-600">
                      {promoCodeValue} - {t("s_r")}
                    </span>
                  </li>
                ) : null}
              </ul>
              {addons.get(getQuoteSelected.id)?.length ? (
                <>
                  <div className="mt-4 flex items-center gap-3 align-baseline">
                    <h4 className="text-lg font-medium">{t("addons")}</h4>
                    <p className="text-xs text-gray-500">
                      ({t("addons_hint")})
                    </p>
                  </div>
                  <ul className="flex w-full list-none flex-col gap-4 font-medium">
                    {addons.get(getQuoteSelected.id)?.map((a) => {
                      let addon = getQuoteSelected.addons.find(
                        (d) => d.id === a,
                      )!;

                      return (
                        <li className="flex justify-between" key={a}>
                          <span>{addon.name}</span>
                          <span className="flex gap-2">
                            {addon.price} {t("s_r")}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
              <Separator />
              <div className="mb-8 flex flex-nowrap justify-between">
                <span>{t("total")}</span>

                <div className="flex flex-nowrap items-center justify-center gap-2 align-baseline">
                  <span className="text-4xl font-medium">{totalInvoice}</span>
                  {t("s_r")}
                </div>
              </div>

              <ActionButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
