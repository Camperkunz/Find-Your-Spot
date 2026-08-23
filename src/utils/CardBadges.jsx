import { memo } from 'react';
import {
    TbParkingCircleFilled,
    TbCurrencyDollar
} from "react-icons/tb";

import {
    MdOutlineAccessible,
    MdNotAccessible
} from "react-icons/md";
// 
const PARKING_BADGES = {
    paid: { label: 'Paid parking', Icon: TbParkingCircleFilled, color: 'text-amber-500', showFee: true },
    free: { label: 'Free parking', Icon: TbParkingCircleFilled, color: 'text-accent' },
};

const ACCESSIBILITY_BADGES = {
    true: { label: 'Accessible', Icon: MdOutlineAccessible, color: 'text-accent' },
    false: { label: 'Not accessible', Icon: MdNotAccessible, color: 'text-danger' },
};

const CornerBadge = memo(function CornerBadge({ label, Icon, color, showFee }) {
    return (
        <span
            title={label}
            aria-label={label}
            className={`relative flex items-center justify-center size-8 md:size-9 rounded-full ${color}`}
        >
            {Icon && <Icon className="size-7.5 md:size-8" />}
            {showFee && (
                <span
                    className="absolute -bottom-0.5 -right-1 flex items-center justify-center size-4 md:size-4 rounded-full bg-amber-500 text-white ring-2 ring-surface-card"
                    aria-hidden="true"
                >
                    <TbCurrencyDollar className="w-2.5 h-2.5 md:w-3 md:h-3" strokeWidth={3} />
                </span>
            )}
        </span>
    );
});

const CardBadges = memo(function CardBadges({ parking, accessibility }) {
    const activeBadges = [
        PARKING_BADGES[parking],
        ACCESSIBILITY_BADGES[accessibility]
    ].filter(Boolean);

    if (activeBadges.length === 0) return null;

    return (
        <div className="absolute top-3 right-3 md:top-4 md:right-5 z-10 flex items-center gap-1.5">
            {activeBadges.map((badge) => (
                <CornerBadge key={badge.label} {...badge} />
            ))}
        </div>
    );
});

export default CardBadges;