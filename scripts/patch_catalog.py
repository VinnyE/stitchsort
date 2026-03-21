#!/usr/bin/env python3
"""Patch seed_catalog.json: add street_usd prices, segment labels, and 5 new budget products."""

import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
INPUT_PATH = REPO_ROOT / "data" / "seed_catalog.json"
OUTPUT_PATH = INPUT_PATH  # overwrite in place

# ── 1. Street prices (product_id → USD) ───────────────────────────────────────
STREET_PRICES = {
    "brother-cs7000x": 249,
    "janome-hd3000": 379,
    "juki-hzl-f300": 499,
    "juki-tl-2010q": 749,
    "brother-pq1500sl": 749,
    "brother-se700": 530,
    "janome-4120qdc-g": 499,
    "brother-xr9550": 199,
    "juki-hzl-dx5": 899,
    "brother-pe900": 737,
    "brother-st371hd": 169,
    "singer-quantum-stylist-9960": 349,
    "janome-skyline-s3-anniversary-edition": 799,
    "baby-lock-jazz-ii": 699,
    "pfaff-quilt-expression-725": 4999,
    "pfaff-passport-3-0": 899,
    "janome-2212": 189,
    "bernina-335": 1299,
    "singer-heavy-duty-4423": 175,
    "bernina-435": 1599,
    "bernette-77": 799,
    "bernina-475-qe": 2199,
    "janome-hd1000": 229,
    "pfaff-ambition-620": 1499,
    "janome-mod-30": 349,
    "brother-cp100x": 149,
    "janome-horizon-memory-craft-9480qcp": 6999,
    "baby-lock-zest": 249,
    "bernette-38": 399,
    "baby-lock-aurora": 1999,
    "baby-lock-jubilant": 299,
    "bernette-79": 999,
    "husqvarna-viking-jade-20": 699,
    "pfaff-creative-expect-350": 1499,
    "husqvarna-viking-opal-690q": 1299,
    "juki-hzl-353zr-c": 399,
    "singer-heavy-duty-6800c": 279,
    "bernette-35": 249,
    "singer-patchwork-7285q": 299,
    "husqvarna-viking-onyx-25": 1999,
    "singer-simple-3337": 112,
}

# ── 2. Segments (product_id → list[str]) ─────────────────────────────────────
SEGMENTS = {
    # Budget mechanical ($80-150)
    "singer-simple-3337": ["budget_mechanical"],
    "brother-cp100x": ["budget_mechanical"],
    # Budget computerized ($150-300)
    "brother-xr9550": ["budget_computerized"],
    "brother-st371hd": ["budget_computerized"],
    "singer-heavy-duty-4423": ["budget_computerized"],
    "janome-2212": ["budget_computerized"],
    "singer-heavy-duty-6800c": ["budget_computerized"],
    "bernette-35": ["budget_computerized"],
    "baby-lock-zest": ["budget_computerized"],
    "brother-cs7000x": ["budget_computerized"],
    # Mid-range ($300-600)
    "janome-hd3000": ["mid_range"],
    "juki-hzl-f300": ["mid_range"],
    "janome-4120qdc-g": ["mid_range", "quilting_focused"],
    "singer-quantum-stylist-9960": ["mid_range"],
    "janome-mod-30": ["mid_range"],
    "bernette-38": ["mid_range"],
    "juki-hzl-353zr-c": ["mid_range"],
    "brother-se700": ["mid_range", "embroidery"],
    "baby-lock-jubilant": ["mid_range"],
    "singer-patchwork-7285q": ["mid_range"],
    # Quilting focused
    "juki-tl-2010q": ["quilting_focused"],
    "brother-pq1500sl": ["quilting_focused"],
    "pfaff-quilt-expression-725": ["quilting_focused", "premium"],
    "janome-skyline-s3-anniversary-edition": ["quilting_focused"],
    "bernette-77": ["quilting_focused"],
    "husqvarna-viking-opal-690q": ["quilting_focused", "premium"],
    "bernina-475-qe": ["quilting_focused", "premium"],
    # Embroidery
    "brother-pe900": ["embroidery"],
    "bernette-79": ["embroidery"],
    "pfaff-creative-expect-350": ["embroidery", "premium"],
    "baby-lock-aurora": ["embroidery", "premium"],
    # Premium ($800+)
    "bernina-335": ["premium"],
    "bernina-435": ["premium"],
    "pfaff-ambition-620": ["premium"],
    "pfaff-passport-3-0": ["premium"],
    "juki-hzl-dx5": ["premium"],
    "husqvarna-viking-onyx-25": ["premium"],
    "janome-horizon-memory-craft-9480qcp": ["premium"],
    "baby-lock-jazz-ii": ["premium"],
    "husqvarna-viking-jade-20": [],  # mid-premium, not in any explicit list above
}

# ── 3. New budget products ────────────────────────────────────────────────────
NEW_PRODUCTS = [
    {
        "product_id": "brother-lx3817",
        "brand": "Brother",
        "model": "LX3817",
        "full_name": "Brother LX3817 Full-Featured Sewing Machine",
        "status": "current",
        "category": "consumer sewing machines",
        "subcategories": ["mechanical", "beginner", "general_purpose"],
        "official_url": None,
        "image_url": None,
        "launch_year": None,
        "price": {
            "currency": "USD",
            "msrp": None,
            "street_usd": 90,
            "street_price_low": 80,
            "street_price_high": 100,
            "price_band_id": "under_200",
            "price_source": "Amazon, March 2026",
            "price_last_verified_at": "2026-03-20T12:00:00Z",
        },
        "availability": {
            "availability_status": "available",
            "regions_verified": ["US"],
            "last_verified_at": "2026-03-20T12:00:00Z",
        },
        "merchant_availability": [
            {
                "merchant": "Amazon",
                "url": None,
                "in_stock": True,
                "notes": "Current US listing checked in March 2026.",
            }
        ],
        "fit": {
            "skill_level_fit": {
                "beginner": 1.0,
                "advanced_beginner": 0.5,
                "intermediate": 0.1,
                "advanced": 0,
            },
            "use_case_fit": {
                "learn_general_sewing": 0.85,
                "mending_and_hemming": 0.7,
                "garment_making": 0.3,
                "quilting_light": 0,
                "quilting_serious": 0,
                "bags_denim_costumes": 0,
                "embroidery_entry": 0,
                "combo_sewing_embroidery": 0,
                "small_space_travel_classes": 0.6,
                "high_speed_straight_stitch_piecing": 0,
            },
            "priority_modifier_fit": {
                "best_value": 0.8,
                "easiest_to_learn": 0.7,
                "portable": 0.6,
                "heavy_fabric_capable": 0,
                "quiet_smooth": 0,
                "large_workspace": 0,
                "embroidery_capable": 0,
                "dealer_support": 0,
                "premium_build": 0,
                "upgrade_headroom": 0.2,
            },
            "budget_fit": {
                "under_200": 1.0,
                "200_349": 0,
                "350_599": 0,
                "600_999": 0,
                "1000_1999": 0,
                "2000_plus": 0,
            },
            "best_for": ["absolute beginners", "basic mending"],
            "not_ideal_for": [
                "projects requiring more than basic stitches",
                "heavier fabrics",
            ],
        },
        "decision_specs": {
            "machine_class": "mechanical",
            "built_in_stitches": 17,
            "buttonhole_modes": 1,
            "max_embroidery_area_mm": None,
            "throat_space_right_of_needle_mm": None,
            "max_speed_spm": 400,
            "weight_lbs": 12.6,
            "feed_system": "standard",
            "adjustable_presser_foot_pressure": None,
            "drop_feed": True,
            "bobbin_system": "drop_in",
            "automatic_thread_cutter": False,
            "speed_control_slider": False,
            "free_arm": True,
            "connectivity_or_design_transfer": "none",
        },
        "filter_tags": ["beginner", "mechanical", "under_150", "budget"],
        "recommend_when": [
            "budget_max<=100",
            "use_case=basic_mending_or_learning",
        ],
        "avoid_when": [
            "needs=variety_of_stitches",
            "use_case=garment_making",
        ],
        "strengths": [
            "Very affordable entry point",
            "Simple mechanical design is reliable",
            "Compact and lightweight",
        ],
        "tradeoffs": [
            "Only 17 stitches",
            "No auto needle threader",
            "Limited upgrade potential",
        ],
        "known_issues": [],
        "ownership_notes": {
            "warranty": "25-year limited",
            "support_reputation": "Standard Brother support network",
            "parts_or_accessory_ecosystem": "Basic Brother accessory compatibility",
            "learning_curve": "Very low",
        },
        "review_signal": {
            "editorial_sources_count": 1,
            "community_signal_summary": "Budget pick for bare-basics sewing tasks.",
            "retailer_rating_summary": "Widely available at major US retailers.",
        },
        "recommendation_rationale": "The most affordable Brother mechanical option. Suits absolute beginners and basic mending tasks where budget is the primary constraint.",
        "query_match_examples": [
            "cheapest sewing machine that works",
            "sewing machine for basic mending under 100",
        ],
        "scores": {
            "overall_seed_score": 6.0,
            "query_coverage_value": 7.0,
            "product_quality_performance": 5.5,
            "value_for_money": 8.0,
            "reliability_support": 6.5,
            "availability": 8.5,
            "review_consensus": 5.5,
            "data_confidence": 7.0,
            "redundancy_penalty": 0.2,
        },
        "confidence": 0.75,
        "source_ids": ["brother-lx3817_retailer"],
        "source_map": {
            "identity": ["brother-lx3817_retailer"],
            "specs": ["brother-lx3817_retailer"],
            "price": ["brother-lx3817_retailer"],
            "availability": ["brother-lx3817_retailer"],
            "fit": [],
            "review": [],
        },
        "segments": ["budget_mechanical"],
    },
    {
        "product_id": "singer-start-1304",
        "brand": "Singer",
        "model": "Start 1304",
        "full_name": "Singer Start 1304 Sewing Machine",
        "status": "current",
        "category": "consumer sewing machines",
        "subcategories": ["mechanical", "beginner", "general_purpose"],
        "official_url": None,
        "image_url": None,
        "launch_year": None,
        "price": {
            "currency": "USD",
            "msrp": None,
            "street_usd": 100,
            "street_price_low": 90,
            "street_price_high": 110,
            "price_band_id": "under_200",
            "price_source": "Amazon, March 2026",
            "price_last_verified_at": "2026-03-20T12:00:00Z",
        },
        "availability": {
            "availability_status": "available",
            "regions_verified": ["US"],
            "last_verified_at": "2026-03-20T12:00:00Z",
        },
        "merchant_availability": [
            {
                "merchant": "Amazon",
                "url": None,
                "in_stock": True,
                "notes": "Current US listing checked in March 2026.",
            }
        ],
        "fit": {
            "skill_level_fit": {
                "beginner": 1.0,
                "advanced_beginner": 0.4,
                "intermediate": 0.1,
                "advanced": 0,
            },
            "use_case_fit": {
                "learn_general_sewing": 0.8,
                "mending_and_hemming": 0.6,
                "garment_making": 0.2,
                "quilting_light": 0,
                "quilting_serious": 0,
                "bags_denim_costumes": 0,
                "embroidery_entry": 0,
                "combo_sewing_embroidery": 0,
                "small_space_travel_classes": 0.75,
                "high_speed_straight_stitch_piecing": 0,
            },
            "priority_modifier_fit": {
                "best_value": 0.75,
                "easiest_to_learn": 0.85,
                "portable": 0.9,
                "heavy_fabric_capable": 0,
                "quiet_smooth": 0,
                "large_workspace": 0,
                "embroidery_capable": 0,
                "dealer_support": 0,
                "premium_build": 0,
                "upgrade_headroom": 0.1,
            },
            "budget_fit": {
                "under_200": 1.0,
                "200_349": 0,
                "350_599": 0,
                "600_999": 0,
                "1000_1999": 0,
                "2000_plus": 0,
            },
            "best_for": ["absolute beginners", "kids learning to sew"],
            "not_ideal_for": ["anyone who will outgrow 6 stitches quickly", "heavier fabrics"],
        },
        "decision_specs": {
            "machine_class": "mechanical",
            "built_in_stitches": 6,
            "buttonhole_modes": 1,
            "max_embroidery_area_mm": None,
            "throat_space_right_of_needle_mm": None,
            "max_speed_spm": 750,
            "weight_lbs": 8.5,
            "feed_system": "standard",
            "adjustable_presser_foot_pressure": None,
            "drop_feed": False,
            "bobbin_system": "top_drop",
            "automatic_thread_cutter": False,
            "speed_control_slider": False,
            "free_arm": True,
            "connectivity_or_design_transfer": "none",
        },
        "filter_tags": ["beginner", "mechanical", "under_150", "budget", "portable", "kids"],
        "recommend_when": [
            "budget_max<=100",
            "use_case=first_machine_kids_or_basics",
        ],
        "avoid_when": [
            "needs=variety_of_stitches",
            "use_case=garment_making_or_heavy_fabrics",
        ],
        "strengths": [
            "Very lightweight and portable at 8.5 lbs",
            "Extremely simple — ideal for young learners",
            "Trusted Singer brand with easy replacement parts",
        ],
        "tradeoffs": [
            "Only 6 stitches — very limiting",
            "No auto threader",
            "Outgrown quickly as skills develop",
        ],
        "known_issues": [],
        "ownership_notes": {
            "warranty": "Limited warranty",
            "support_reputation": "Singer has broad US service network",
            "parts_or_accessory_ecosystem": "Standard Singer accessory compatibility",
            "learning_curve": "Very low",
        },
        "review_signal": {
            "editorial_sources_count": 1,
            "community_signal_summary": "Often cited as a first machine for kids or gift purchases.",
            "retailer_rating_summary": "Available at major US mass-market retailers.",
        },
        "recommendation_rationale": "The lightest and most stripped-down option in the catalog. Best for kids or complete beginners who just need to make a few stitches without overwhelm.",
        "query_match_examples": [
            "sewing machine for kids",
            "simplest sewing machine for beginners",
            "cheap sewing machine gift",
        ],
        "scores": {
            "overall_seed_score": 5.8,
            "query_coverage_value": 6.5,
            "product_quality_performance": 5.5,
            "value_for_money": 7.5,
            "reliability_support": 6.5,
            "availability": 8.5,
            "review_consensus": 5.5,
            "data_confidence": 7.0,
            "redundancy_penalty": 0.3,
        },
        "confidence": 0.72,
        "source_ids": ["singer-start-1304_retailer"],
        "source_map": {
            "identity": ["singer-start-1304_retailer"],
            "specs": ["singer-start-1304_retailer"],
            "price": ["singer-start-1304_retailer"],
            "availability": ["singer-start-1304_retailer"],
            "fit": [],
            "review": [],
        },
        "segments": ["budget_mechanical"],
    },
    {
        "product_id": "singer-m1500",
        "brand": "Singer",
        "model": "M1500",
        "full_name": "Singer M1500 Sewing Machine",
        "status": "current",
        "category": "consumer sewing machines",
        "subcategories": ["mechanical", "beginner", "general_purpose"],
        "official_url": None,
        "image_url": None,
        "launch_year": None,
        "price": {
            "currency": "USD",
            "msrp": None,
            "street_usd": 119,
            "street_price_low": 110,
            "street_price_high": 130,
            "price_band_id": "under_200",
            "price_source": "Amazon, March 2026",
            "price_last_verified_at": "2026-03-20T12:00:00Z",
        },
        "availability": {
            "availability_status": "available",
            "regions_verified": ["US"],
            "last_verified_at": "2026-03-20T12:00:00Z",
        },
        "merchant_availability": [
            {
                "merchant": "Amazon",
                "url": None,
                "in_stock": True,
                "notes": "Current US listing checked in March 2026.",
            }
        ],
        "fit": {
            "skill_level_fit": {
                "beginner": 1.0,
                "advanced_beginner": 0.6,
                "intermediate": 0.15,
                "advanced": 0,
            },
            "use_case_fit": {
                "learn_general_sewing": 0.88,
                "mending_and_hemming": 0.72,
                "garment_making": 0.4,
                "quilting_light": 0,
                "quilting_serious": 0,
                "bags_denim_costumes": 0,
                "embroidery_entry": 0,
                "combo_sewing_embroidery": 0,
                "small_space_travel_classes": 0.55,
                "high_speed_straight_stitch_piecing": 0,
            },
            "priority_modifier_fit": {
                "best_value": 0.85,
                "easiest_to_learn": 0.8,
                "portable": 0.55,
                "heavy_fabric_capable": 0,
                "quiet_smooth": 0,
                "large_workspace": 0,
                "embroidery_capable": 0,
                "dealer_support": 0,
                "premium_build": 0,
                "upgrade_headroom": 0.3,
            },
            "budget_fit": {
                "under_200": 1.0,
                "200_349": 0,
                "350_599": 0,
                "600_999": 0,
                "1000_1999": 0,
                "2000_plus": 0,
            },
            "best_for": ["beginners wanting more stitches on a budget"],
            "not_ideal_for": ["heavier fabrics", "garment construction beyond basics"],
        },
        "decision_specs": {
            "machine_class": "mechanical",
            "built_in_stitches": 57,
            "buttonhole_modes": 1,
            "max_embroidery_area_mm": None,
            "throat_space_right_of_needle_mm": None,
            "max_speed_spm": 750,
            "weight_lbs": 13.0,
            "feed_system": "standard",
            "adjustable_presser_foot_pressure": None,
            "drop_feed": False,
            "bobbin_system": "top_drop",
            "automatic_thread_cutter": False,
            "speed_control_slider": False,
            "free_arm": True,
            "connectivity_or_design_transfer": "none",
        },
        "filter_tags": ["beginner", "mechanical", "under_150", "budget", "stitch_variety"],
        "recommend_when": [
            "budget_max<=130",
            "wants=stitch_variety_on_budget",
        ],
        "avoid_when": [
            "needs=computerized_features",
            "use_case=heavy_duty",
        ],
        "strengths": [
            "57 stitches for a mechanical machine at this price",
            "Auto needle threader",
            "Singer reliability reputation",
        ],
        "tradeoffs": [
            "No computerized features",
            "Somewhat heavy at 13 lbs for its price tier",
            "No drop feed dogs",
        ],
        "known_issues": [],
        "ownership_notes": {
            "warranty": "Limited warranty",
            "support_reputation": "Singer broad US service network",
            "parts_or_accessory_ecosystem": "Standard Singer accessory compatibility",
            "learning_curve": "Low",
        },
        "review_signal": {
            "editorial_sources_count": 1,
            "community_signal_summary": "Solid budget pick when stitch count matters on a very tight budget.",
            "retailer_rating_summary": "Available at major US retailers.",
        },
        "recommendation_rationale": "Offers substantially more stitch options than competitors at the same price point. The auto threader makes it friendlier than basic Singer models for beginners who need guidance.",
        "query_match_examples": [
            "best mechanical sewing machine under 150",
            "sewing machine with lots of stitches under 150",
        ],
        "scores": {
            "overall_seed_score": 6.2,
            "query_coverage_value": 6.8,
            "product_quality_performance": 5.8,
            "value_for_money": 8.2,
            "reliability_support": 6.5,
            "availability": 8.5,
            "review_consensus": 5.8,
            "data_confidence": 7.0,
            "redundancy_penalty": 0.2,
        },
        "confidence": 0.73,
        "source_ids": ["singer-m1500_retailer"],
        "source_map": {
            "identity": ["singer-m1500_retailer"],
            "specs": ["singer-m1500_retailer"],
            "price": ["singer-m1500_retailer"],
            "availability": ["singer-m1500_retailer"],
            "fit": [],
            "review": [],
        },
        "segments": ["budget_mechanical"],
    },
    {
        "product_id": "brother-xm2701",
        "brand": "Brother",
        "model": "XM2701",
        "full_name": "Brother XM2701 Lightweight Full-Featured Sewing Machine",
        "status": "current",
        "category": "consumer sewing machines",
        "subcategories": ["mechanical", "beginner", "general_purpose"],
        "official_url": None,
        "image_url": None,
        "launch_year": None,
        "price": {
            "currency": "USD",
            "msrp": None,
            "street_usd": 130,
            "street_price_low": 120,
            "street_price_high": 145,
            "price_band_id": "under_200",
            "price_source": "Amazon, March 2026",
            "price_last_verified_at": "2026-03-20T12:00:00Z",
        },
        "availability": {
            "availability_status": "available",
            "regions_verified": ["US"],
            "last_verified_at": "2026-03-20T12:00:00Z",
        },
        "merchant_availability": [
            {
                "merchant": "Amazon",
                "url": None,
                "in_stock": True,
                "notes": "Current US listing checked in March 2026.",
            }
        ],
        "fit": {
            "skill_level_fit": {
                "beginner": 1.0,
                "advanced_beginner": 0.72,
                "intermediate": 0.2,
                "advanced": 0,
            },
            "use_case_fit": {
                "learn_general_sewing": 0.9,
                "mending_and_hemming": 0.8,
                "garment_making": 0.5,
                "quilting_light": 0,
                "quilting_serious": 0,
                "bags_denim_costumes": 0,
                "embroidery_entry": 0,
                "combo_sewing_embroidery": 0,
                "small_space_travel_classes": 0.8,
                "high_speed_straight_stitch_piecing": 0,
            },
            "priority_modifier_fit": {
                "best_value": 0.9,
                "easiest_to_learn": 0.85,
                "portable": 0.8,
                "heavy_fabric_capable": 0,
                "quiet_smooth": 0,
                "large_workspace": 0,
                "embroidery_capable": 0,
                "dealer_support": 0,
                "premium_build": 0,
                "upgrade_headroom": 0.4,
            },
            "budget_fit": {
                "under_200": 1.0,
                "200_349": 0.1,
                "350_599": 0,
                "600_999": 0,
                "1000_1999": 0,
                "2000_plus": 0,
            },
            "best_for": ["beginners", "alterations", "light garment sewing"],
            "not_ideal_for": ["heavy fabrics", "buyers needing computerized features"],
        },
        "decision_specs": {
            "machine_class": "mechanical",
            "built_in_stitches": 27,
            "buttonhole_modes": 1,
            "max_embroidery_area_mm": None,
            "throat_space_right_of_needle_mm": None,
            "max_speed_spm": 850,
            "weight_lbs": 12.6,
            "feed_system": "standard",
            "adjustable_presser_foot_pressure": None,
            "drop_feed": True,
            "bobbin_system": "drop_in",
            "automatic_thread_cutter": False,
            "speed_control_slider": False,
            "free_arm": True,
            "connectivity_or_design_transfer": "none",
        },
        "filter_tags": ["beginner", "mechanical", "under_150", "budget", "portable", "one_step_buttonhole"],
        "recommend_when": [
            "budget_max<=140",
            "use_case in [learning,alterations,light_garments]",
        ],
        "avoid_when": [
            "needs=computerized_screen",
            "use_case=heavy_duty",
        ],
        "strengths": [
            "One-step buttonhole makes garment sewing accessible",
            "Drop-in bobbin and auto threader reduce setup frustration",
            "Lightweight at 12.6 lbs with good feature-to-price ratio",
        ],
        "tradeoffs": [
            "Mechanical limits compared to computerized machines at similar price",
            "27 stitches is modest",
        ],
        "known_issues": [],
        "ownership_notes": {
            "warranty": "25-year limited",
            "support_reputation": "Broad Brother US support network",
            "parts_or_accessory_ecosystem": "Large Brother accessory ecosystem",
            "learning_curve": "Low",
        },
        "review_signal": {
            "editorial_sources_count": 1,
            "community_signal_summary": "Popular budget recommendation with good usability features for the price.",
            "retailer_rating_summary": "Widely available at major US retailers.",
        },
        "recommendation_rationale": "A step up in usability from bare-basics mechanicals. The auto threader, drop-in bobbin, and one-step buttonhole differentiate it meaningfully from the cheapest options without crossing into computerized territory.",
        "query_match_examples": [
            "best sewing machine under 150",
            "lightweight beginner sewing machine",
            "sewing machine for alterations under 150",
        ],
        "scores": {
            "overall_seed_score": 6.8,
            "query_coverage_value": 7.5,
            "product_quality_performance": 6.2,
            "value_for_money": 8.5,
            "reliability_support": 7.0,
            "availability": 8.8,
            "review_consensus": 6.5,
            "data_confidence": 7.5,
            "redundancy_penalty": 0.2,
        },
        "confidence": 0.78,
        "source_ids": ["brother-xm2701_retailer"],
        "source_map": {
            "identity": ["brother-xm2701_retailer"],
            "specs": ["brother-xm2701_retailer"],
            "price": ["brother-xm2701_retailer"],
            "availability": ["brother-xm2701_retailer"],
            "fit": [],
            "review": [],
        },
        "segments": ["budget_mechanical", "budget_computerized"],
    },
    {
        "product_id": "singer-simple-3232",
        "brand": "Singer",
        "model": "Simple 3232",
        "full_name": "Singer Simple 3232 Sewing Machine",
        "status": "current",
        "category": "consumer sewing machines",
        "subcategories": ["mechanical", "beginner", "general_purpose"],
        "official_url": None,
        "image_url": None,
        "launch_year": None,
        "price": {
            "currency": "USD",
            "msrp": None,
            "street_usd": 160,
            "street_price_low": 150,
            "street_price_high": 175,
            "price_band_id": "under_200",
            "price_source": "Amazon, March 2026",
            "price_last_verified_at": "2026-03-20T12:00:00Z",
        },
        "availability": {
            "availability_status": "available",
            "regions_verified": ["US"],
            "last_verified_at": "2026-03-20T12:00:00Z",
        },
        "merchant_availability": [
            {
                "merchant": "Amazon",
                "url": None,
                "in_stock": True,
                "notes": "Current US listing checked in March 2026.",
            }
        ],
        "fit": {
            "skill_level_fit": {
                "beginner": 1.0,
                "advanced_beginner": 0.75,
                "intermediate": 0.25,
                "advanced": 0,
            },
            "use_case_fit": {
                "learn_general_sewing": 0.9,
                "mending_and_hemming": 0.78,
                "garment_making": 0.55,
                "quilting_light": 0.3,
                "quilting_serious": 0,
                "bags_denim_costumes": 0,
                "embroidery_entry": 0,
                "combo_sewing_embroidery": 0,
                "small_space_travel_classes": 0.5,
                "high_speed_straight_stitch_piecing": 0,
            },
            "priority_modifier_fit": {
                "best_value": 0.88,
                "easiest_to_learn": 0.82,
                "portable": 0.45,
                "heavy_fabric_capable": 0,
                "quiet_smooth": 0,
                "large_workspace": 0,
                "embroidery_capable": 0,
                "dealer_support": 0,
                "premium_build": 0,
                "upgrade_headroom": 0.45,
            },
            "budget_fit": {
                "under_200": 1.0,
                "200_349": 0.1,
                "350_599": 0,
                "600_999": 0,
                "1000_1999": 0,
                "2000_plus": 0,
            },
            "best_for": ["beginners who want mechanical reliability with more features"],
            "not_ideal_for": ["heavy fabrics", "advanced garment construction"],
        },
        "decision_specs": {
            "machine_class": "mechanical",
            "built_in_stitches": 32,
            "buttonhole_modes": 1,
            "max_embroidery_area_mm": None,
            "throat_space_right_of_needle_mm": None,
            "max_speed_spm": 750,
            "weight_lbs": 14.0,
            "feed_system": "standard",
            "adjustable_presser_foot_pressure": None,
            "drop_feed": False,
            "bobbin_system": "top_drop",
            "automatic_thread_cutter": False,
            "speed_control_slider": False,
            "free_arm": True,
            "connectivity_or_design_transfer": "none",
        },
        "filter_tags": ["beginner", "mechanical", "under_200", "budget", "one_step_buttonhole"],
        "recommend_when": [
            "budget_max<=175",
            "prefers=mechanical_simplicity",
            "wants=more_stitches",
        ],
        "avoid_when": [
            "needs=computerized_features",
            "use_case=heavy_fabrics",
        ],
        "strengths": [
            "32 stitches including practical decorative options",
            "Auto threader and one-step buttonhole",
            "Mechanical reliability without electronics to fail",
        ],
        "tradeoffs": [
            "Heavier than comparable options at 14 lbs",
            "No drop feed for free-motion work",
            "Limited workspace",
        ],
        "known_issues": [],
        "ownership_notes": {
            "warranty": "Limited warranty",
            "support_reputation": "Singer broad US service network",
            "parts_or_accessory_ecosystem": "Standard Singer accessory compatibility",
            "learning_curve": "Low",
        },
        "review_signal": {
            "editorial_sources_count": 1,
            "community_signal_summary": "Recommended for beginners who prefer mechanical machines over computerized.",
            "retailer_rating_summary": "Available at major US retailers.",
        },
        "recommendation_rationale": "Bridges the gap between bare-basics mechanicals and computerized beginner machines. Good for users who want mechanical durability with a reasonable stitch selection at an accessible price.",
        "query_match_examples": [
            "mechanical sewing machine for beginners under 200",
            "simple sewing machine more stitches",
            "reliable beginner sewing machine no computer",
        ],
        "scores": {
            "overall_seed_score": 6.5,
            "query_coverage_value": 7.2,
            "product_quality_performance": 6.0,
            "value_for_money": 8.0,
            "reliability_support": 7.0,
            "availability": 8.5,
            "review_consensus": 6.0,
            "data_confidence": 7.2,
            "redundancy_penalty": 0.2,
        },
        "confidence": 0.76,
        "source_ids": ["singer-simple-3232_retailer"],
        "source_map": {
            "identity": ["singer-simple-3232_retailer"],
            "specs": ["singer-simple-3232_retailer"],
            "price": ["singer-simple-3232_retailer"],
            "availability": ["singer-simple-3232_retailer"],
            "fit": [],
            "review": [],
        },
        "segments": ["budget_computerized"],
    },
]


def patch_catalog(data: dict) -> dict:
    products = data["products"]

    for product in products:
        pid = product["product_id"]

        # ── Apply street_usd price ─────────────────────────────────────────
        if pid in STREET_PRICES:
            price = product.setdefault("price", {})
            price["street_usd"] = STREET_PRICES[pid]
            if "price_source" not in price:
                price["price_source"] = "Amazon / Sewing Machines Plus / manufacturer, March 2026"

        # ── Apply segments ─────────────────────────────────────────────────
        segs = SEGMENTS.get(pid)
        if segs is not None:
            product["segments"] = segs
        elif "segments" not in product:
            product["segments"] = []

    # ── Append new products ────────────────────────────────────────────────
    existing_ids = {p["product_id"] for p in products}
    for new_product in NEW_PRODUCTS:
        if new_product["product_id"] not in existing_ids:
            products.append(new_product)

    # ── Update meta counts ─────────────────────────────────────────────────
    data["meta"]["actual_count"] = len(products)

    return data


def main():
    print(f"Reading {INPUT_PATH} …")
    with open(INPUT_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"Loaded {len(data['products'])} products.")
    data = patch_catalog(data)
    print(f"After patch: {len(data['products'])} products.")

    out_str = json.dumps(data, indent=2, ensure_ascii=False)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(out_str)
        f.write("\n")

    print(f"Written to {OUTPUT_PATH}")

    # Quick sanity checks
    reload = json.loads(out_str)
    products = reload["products"]
    missing_price = [p["product_id"] for p in products if "street_usd" not in p.get("price", {})]
    missing_segments = [p["product_id"] for p in products if "segments" not in p]
    print(f"Products missing street_usd: {missing_price}")
    print(f"Products missing segments:   {missing_segments}")
    print("Done.")


if __name__ == "__main__":
    main()
