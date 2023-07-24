export interface CarView {
  description: string;
  model: string;
}

export interface CarResponse extends CarPayload{
  id: string;
}
export interface CarPayload {
  brandId: string;
  comfortFeatureIds: string[];
  description: string;
  model: string;
  securityFeatureIds: string[];
}

export interface CarFormData {
  brands: CarBrand[];
  securityFeatures: SecurityFeature[];
  comfortFeatures: ComfortFeature[];
}

export interface CarBrand extends NamedId {}

export interface SecurityFeature extends NamedId {}

export interface ComfortFeature extends NamedId {}

interface NamedId {
  name: string;
  id: string;
}
