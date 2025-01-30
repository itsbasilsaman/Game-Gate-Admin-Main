export const validateRegionAndImage = (name: string, nameAr: string, icon: File | null) => {
  const errors = {
    name: '',
    nameAr: '',
    icon: '',
  };
  let hasError = false;

  if (!name.trim()) {
    errors.name = 'Region name is required';
    hasError = true;
  }

  if (!nameAr.trim()) {
    errors.nameAr = 'Arabic region name is required';
    hasError = true;
  }

  if (!icon) {
    errors.icon = 'Icon image is required';
    hasError = true;
  } else if (icon.size > 5 * 1024 * 1024) {
    errors.icon = 'Image size exceeds 5MB';
    hasError = true;
  }

  return { errors, hasError };
};