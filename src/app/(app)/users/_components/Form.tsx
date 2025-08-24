import { UpdateField } from "@/components/Layout";
import { User } from "@/types/User";
import { Grid } from "@radix-ui/themes";

type UserFormProps = {
  user: User;
  error?: any;
  loading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const UserForm = ({ user, error, loading, onChange }: UserFormProps) => {
  return (
    <Grid gap="3" columns="3">
      <UpdateField
        inputType="text"
        title="Nom"
        name="name"
        error={error}
        disabled={loading}
        value={user.name}
        onChange={onChange}
      />
      <UpdateField
        inputType="text"
        title="Nom"
        name="Role"
        error={error}
        disabled={loading}
        value={user.role}
        onChange={onChange}
      />
      <UpdateField
        inputType="text"
        title="Email"
        error={error}
        disabled={loading}
        name="email"
        value={user.email}
        onChange={onChange}
      />
      <UpdateField
        inputType="text"
        title="Date de création"
        name="phone"
        value={user.createdAt}
        disabled={true}
        error={error}
        onChange={onChange}
      />
    </Grid>
  );
};
