import InputBase from "@/shared/components/Inputs/InputBase";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { displayPrice } from "@/shared/lib/format-pricing";
import { cn } from "@/shared/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
  useSummaryCalcTax,
  useGetQuoteSelectedV2,
  useInvoiceSummary,
  useQuotePricingServiceV2,
} from "../../_services/QuotePricingServiceV2";
import { paymentWay } from "../../_services/paymentWay";
import { quotesData } from "../../_services/quotesData";
import ActionButtonV2 from "./ActionButtonV2";
import AddonsList from "./AddonsList";
import FeatList from "./FeatList";

const checkedDecagramIcon = "/assets/svg/icons/checked-decagram.svg";

export default function Summary() {
  const {
    quoteSelected,
    paymentMonths,
    promoCode,
    promoCodeValid,
    promoCodeValue,
    onCheckPromoCode,
    onChange,
    onSelectPaymentWay,
    AddonSelected,
    AddonSelectedPlusMinus,
    AddonSelectedDropdown,
  } = useQuotePricingServiceV2();

  const t = useTranslations("sales");
  const locale = useLocale();
  const { totalTax } = useSummaryCalcTax();
  const totalSummary = useInvoiceSummary();
  const getQuoteSelected = useGetQuoteSelectedV2(quoteSelected!)!;

  return (
    <>
      <div className="min-h-layout container relative z-10">
        <div className="grid h-full w-full grid-cols-2 gap-y-6 lg:gap-2">
          <div className="col-span-2 flex flex-col gap-4 md:px-2 lg:col-span-1 lg:h-full lg:px-0">
            <h2 className="mt-6 text-2xl font-medium">
              {t("quote")} {t(getQuoteSelected.name as any)}
            </h2>
            <FeatList quote={getQuoteSelected} isSpeared={false} />

            <div className="flex justify-between rtl:mb-4 rtl:px-4">
              <div className="flex flex-1 flex-col justify-center gap-4">
                <h2 className="text-xl font-medium">{t("guarantee_title")}</h2>
                <p className="text-lg font-medium text-neutral-600">
                  {t("guarantee_subtitle")}
                </p>
              </div>
              <Image
                src="/assets/images/21-days-guarantee.svg"
                alt={t("guarantee_title")}
                width={150}
                height={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="col-span-2 flex flex-col md:px-2 lg:col-span-1 lg:px-0">
            <div className="mx-auto flex w-full flex-1 flex-col gap-4 px-2 md:px-3 lg:px-6">
              <h2 className="mt-6 text-2xl font-medium">
                {t("summary_order")}
              </h2>
              <h4 className="text-xl font-medium">{t("payment")}</h4>
              <div className="grid w-full grid-cols-4 gap-3 lg:gap-6">
                {paymentWay.map((payment) => {
                  const quote = quotesData.find(
                    (quote) => quote.id === getQuoteSelected.id,
                  )!;
                  return (
                    <div
                      key={payment.type}
                      className={cn(
                        "col-span-2 flex cursor-pointer flex-col items-center justify-center gap-6 rounded-xl border border-slate-50 bg-white p-3 shadow transition-colors duration-75 ease-in lg:flex-1",
                        {
                          "border-primary-600 bg-slate-50":
                            payment.months === paymentMonths,
                        },
                      )}
                      onClick={() => {
                        onSelectPaymentWay(payment.months);
                      }}
                    >
                      <span className="text-xl font-medium">
                        {payment.label[locale as "ar" | "en"]}
                      </span>
                      <div className="flex flex-nowrap items-center justify-center gap-2 align-baseline">
                        <span className="text-3xl">
                          {displayPrice(+quote.price * +payment.months, true)}
                        </span>
                        {t("s_r")}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex w-full items-end gap-3 md:w-4/5 lg:w-full">
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

              <label className="mt-3 text-xl font-medium">
                {t("quote")} {t(getQuoteSelected.name as any)}
              </label>

              <ul className="flex w-full list-none flex-col gap-3 font-medium">
                <li className="flex justify-between">
                  <span>
                    {
                      paymentWay.find(
                        (payment) => payment.months === paymentMonths,
                      )?.label[locale as "ar" | "en"]
                    }
                  </span>
                  <span>
                    {displayPrice(
                      getQuoteSelected.price * paymentMonths,
                      true,
                      locale,
                    )}
                  </span>
                </li>

                <li className="flex justify-between">
                  <span>
                    {t("tax", {
                      amount: 15,
                    })}
                  </span>
                  <span className="flex gap-2">
                    {displayPrice(totalTax, true, locale)}
                  </span>
                </li>
              </ul>

              {AddonSelected.length ||
              AddonSelectedPlusMinus.length ||
              AddonSelectedDropdown.length ? (
                <>
                  <label className="mt-3 text-xl font-medium">
                    {t("addons")}
                  </label>
                  <AddonsList />
                  <ul>
                    {promoCodeValid ? (
                      <li className="flex justify-between font-medium">
                        <span>{t("promo_value")}</span>
                        <span className="flex gap-2 text-red-600">
                          {displayPrice(promoCodeValue, true)} - {t("s_r")}
                        </span>
                      </li>
                    ) : null}
                  </ul>
                </>
              ) : null}

              <Separator />
              <div className="mb-8 flex flex-nowrap justify-between">
                <span className="text-2xl">{t("total")}</span>

                <div className="flex flex-nowrap items-center justify-center gap-2 align-baseline">
                  <span className="text-4xl font-medium">
                    {totalSummary
                      ? displayPrice(totalSummary, true)
                      : totalSummary}
                  </span>
                  {t("s_r")}
                </div>
              </div>
              <ActionButtonV2 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
