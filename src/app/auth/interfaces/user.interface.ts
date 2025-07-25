export interface User {
  id:                    number;
  username:              string;
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
  enabled:               boolean;
  roles:                 string[];
  permissions:           string[];
}
