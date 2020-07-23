'use strict';
const {
        Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
        class Plant extends Model {
                /**
                 * Helper method for defining associations.
                 * This method is not a part of DataTypes lifecycle.
                 * The `models/index` file will call this method automatically.
                 */
                static associate(models) {
                        // define association here
                }
        }
        Plant.init({
                id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: DataTypes.INTEGER
                },
                "veneer_product": DataTypes.STRING(1234),
                "pulpwood_product": DataTypes.STRING(1234),
                "protein_potential": DataTypes.STRING(1234),
                "post_product": DataTypes.STRING(1234),
                "palatable_human": DataTypes.STRING(1234),
                "palatable_graze_animal": DataTypes.STRING(1234),
                "palatable_browse_animal": DataTypes.STRING(1234),
                "nursery_stock_product": DataTypes.STRING(1234),
                "naval_store_product": DataTypes.STRING(1234),
                "lumber_product": DataTypes.STRING(1234),
                "fuelwood_product": DataTypes.STRING(1234),
                "fodder_product": DataTypes.STRING(1234),
                "christmas_tree_product": DataTypes.STRING(1234),
                "berry_nut_seed_product": DataTypes.STRING(1234),
                "vegetative_spread_rate": DataTypes.STRING(1234),
                "small_grain": DataTypes.STRING(1234),
                "seedling_vigor": DataTypes.STRING(1234),
                "seed_spread_rate": DataTypes.STRING(1234),
                "seeds_per_pound": DataTypes.FLOAT,
                "propogated_by_tubers": DataTypes.STRING(1234),
                "propogated_by_sprigs": DataTypes.STRING(1234),
                "propogated_by_sod": DataTypes.STRING(1234),
                "propogated_by_seed": DataTypes.STRING(1234),
                "propogated_by_cuttings": DataTypes.STRING(1234),
                "propogated_by_corms": DataTypes.STRING(1234),
                "propogated_by_container": DataTypes.STRING(1234),
                "propogated_by_bulbs": DataTypes.STRING(1234),
                "propogated_by_bare_root": DataTypes.STRING(1234),
                "fruit_seed_persistence": DataTypes.STRING(1234),
                "fruit_seed_period_end": DataTypes.STRING(1234),
                "fruit_seed_period_begin": DataTypes.STRING(1234),
                "fruit_seed_abundance": DataTypes.STRING(1234),
                "commercial_availability": DataTypes.STRING(1234),
                "bloom_period": DataTypes.STRING(1234),
                "temperature_minimum_f": DataTypes.FLOAT,
                "shade_tolerance": DataTypes.STRING(1234),
                "salinity_tolerance": DataTypes.STRING(1234),
                "root_depth_minimum_inches": DataTypes.STRING(1234),
                "precipitation_maximum": DataTypes.FLOAT,
                "precipitation_minimum": DataTypes.FLOAT,
                "planting_density_per_acre_maximum": DataTypes.FLOAT,
                "planting_density_per_acre_minimum": DataTypes.FLOAT,
                "ph_maximum": DataTypes.FLOAT,
                "ph_minimum": DataTypes.FLOAT,
                "moisture_use": DataTypes.STRING(1234),
                "hedge_tolerance": DataTypes.STRING(1234),
                "frost_free_days_minimum": DataTypes.FLOAT,
                "fire_tolerance": DataTypes.STRING(1234),
                "fertility_requirement": DataTypes.STRING(1234),
                "drought_tolerance": DataTypes.STRING(1234),
                "cold_stratification_required": DataTypes.STRING(1234),
                "caco_3_tolerance": DataTypes.STRING(1234),
                "anaerobic_tolerance": DataTypes.STRING(1234),
                "adapted_to_fine_textured_soils": DataTypes.STRING(1234),
                "adapted_to_medium_textured_soils": DataTypes.STRING(1234),
                "adapted_to_coarse_textured_soils": DataTypes.STRING(1234),
                "toxicity": DataTypes.STRING(1234),
                "shape_and_orientation": DataTypes.STRING(1234),
                "resprout_ability": DataTypes.STRING(1234),
                "nitrogen_fixation": DataTypes.STRING(1234),
                "low_growing_grass": DataTypes.STRING(1234),
                "lifespan": DataTypes.STRING(1234),
                "leaf_retention": DataTypes.STRING(1234),
                "known_allelopath": DataTypes.STRING(1234),
                "height_mature_feet": DataTypes.FLOAT,
                "height_at_base_age_maximum_feet": DataTypes.FLOAT,
                "growth_rate": DataTypes.STRING(1234),
                "growth_form": DataTypes.STRING(1234),
                "fruit_conspicuous": DataTypes.STRING(1234),
                "fruit_color": DataTypes.STRING(1234),
                "foliage_texture": DataTypes.STRING(1234),
                "foliage_porosity_winter": DataTypes.STRING(1234),
                "foliage_porosity_summer": DataTypes.STRING(1234),
                "foliage_color": DataTypes.STRING(1234),
                "flower_conspicuous": DataTypes.STRING(1234),
                "flower_color": DataTypes.STRING(1234),
                "fire_resistance": DataTypes.STRING(1234),
                "fall_conspicuous": DataTypes.STRING(1234),
                "coppice_potential": DataTypes.STRING(1234),
                "c_n_ratio": DataTypes.STRING(1234),
                "bloat": DataTypes.STRING(1234),
                "after_harvest_regrowth_rate": DataTypes.STRING(1234),
                "active_growth_period": DataTypes.STRING(1234),
                "cultivar_name": DataTypes.STRING(1234),
                "characteristics_data": DataTypes.STRING(1234),
                "plant_guides": DataTypes.STRING(1234),
                "plant_guides_text": DataTypes.JSONB,
                "fact_sheets": DataTypes.STRING(1234),
                "image_gallery": DataTypes.STRING(1234),
                "regional_wetland_indicator_status": DataTypes.STRING(1234),
                "national_wetland_indicator_status": DataTypes.STRING(1234),
                "state_t_e_common_name": DataTypes.STRING(1234),
                "state_t_e_status": DataTypes.STRING(1234),
                "federal_t_e_status": DataTypes.STRING(1234),
                "invasive": DataTypes.STRING(1234),
                "state_noxious_common_name": DataTypes.STRING(1234),
                "state_noxious_status": DataTypes.STRING(1234),
                "federal_noxious_common_name": DataTypes.STRING(1234),
                "federal_noxious_status": DataTypes.STRING(1234),
                "native_status": DataTypes.STRING(1234),
                "growth_habit": DataTypes.STRING(1234),
                "duration": DataTypes.STRING(1234),
                "itis_tsn": DataTypes.STRING(1234),
                "kingdom": DataTypes.STRING(1234),
                "subkingdom": DataTypes.STRING(1234),
                "superdivision": DataTypes.STRING(1234),
                "division": DataTypes.STRING(1234),
                "subdivision": DataTypes.STRING(1234),
                "class": DataTypes.STRING(1234),
                "subclass": DataTypes.STRING(1234),
                "order": DataTypes.STRING(1234),
                "family_common_name": DataTypes.STRING(1234),
                "family_symbol": DataTypes.STRING(1234),
                "family": DataTypes.STRING(1234),
                "genus": DataTypes.STRING(1234),
                "category": DataTypes.STRING(1234),
                "state_and_province": DataTypes.STRING(1234),
                "common_name": DataTypes.STRING(1234),
                "parents": DataTypes.STRING(1234),
                "questionable_taxon_indicator": DataTypes.STRING(1234),
                "quadranomial_author": DataTypes.STRING(1234),
                "trinomial_author": DataTypes.STRING(1234),
                "genera_binomial_author": DataTypes.STRING(1234),
                "forma": DataTypes.STRING(1234),
                "forma_prefix": DataTypes.STRING(1234),
                "subvariety": DataTypes.STRING(1234),
                "subvariety_prefix": DataTypes.STRING(1234),
                "variety": DataTypes.STRING(1234),
                "hybrid_variety_indicator": DataTypes.STRING(1234),
                "variety_prefix": DataTypes.STRING(1234),
                "subspecies": DataTypes.STRING(1234),
                "hybrid_subspecies_indicator": DataTypes.STRING(1234),
                "subspecies_prefix": DataTypes.STRING(1234),
                "species": DataTypes.STRING(1234),
                "hybrid_species_indicator": DataTypes.STRING(1234),
                "hybrid_genus_indicator": DataTypes.STRING(1234),
                "scientific_name": DataTypes.STRING(1234),
                "symbol": DataTypes.STRING(1234),
                "synonym_symbol": DataTypes.STRING(1234),
                "accepted_symbol": DataTypes.STRING(1234),
                createdAt: {
                        allowNull: false,
                        type: DataTypes.DATE
                },
                updatedAt: {
                        allowNull: false,
                        type: DataTypes.DATE
                }
        }, {
                        sequelize,
                        modelName: 'Plant',
                });
        return Plant;
};
