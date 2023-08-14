//Misc
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

//Firebase
import { updateUserEmail, updateUserPassword } from "../../utils/firebase/firebase.utils";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

//Redux
import { checkUserSession, updateListSettingsStart } from "../../store/user/user.action";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";

//Styled Components
import {
  SETTINGS_ACCOUNT_CONTAINER,
  PASSWORD_INPUT_GROUP,
  INPUT_CONTAINER
} from "./settings-account.styles";
import { SINGLE_SETTING, SETTING_NAME } from "../settings-lists/settings-lists.styles";


const usernameTemp = "";
const emailTemp = "";

const passwords = {
  newPassword: "",
  confirmPassword: "",
};

const SettingsAccount = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const { username: dataUsername, email: dataEmail } = currentUser;

  const [username, setUsername] = useState(usernameTemp);
  const [email, setEmail] = useState(emailTemp);
  const [passwordFields, setpasswordFields] = useState(passwords);
  const { newPassword, confirmPassword } = passwordFields;

  useEffect(() => {
    setUsername(dataUsername);
    setEmail(dataEmail);
  }, [dataUsername, dataEmail]);

  //Username
  const usernameChangeHandler = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const usernameSubmitHandler = () => {
    if (username.length > 0 && username.length <= 20) {
      dispatch(updateListSettingsStart({ username: { username } }));
    }
  };

  //Email
  const emailChangeHandler = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const emailSubmitHandler = async () => {
    if (email.length > 0) {
      await updateUserEmail(currentUser, email);
      // await updateUserSettings(currentUser, { email });
      dispatch(checkUserSession());
    }
  };

  //Password
  const passwordChangeHandler = (e) => {
    const { name, value } = e.target;
    setpasswordFields({ ...passwordFields, [name]: value });
  };

  const passwordSubmitHandler = async () => {
    if (newPassword === confirmPassword) {
      await updateUserPassword(currentUser, newPassword);
      dispatch(checkUserSession());
      setpasswordFields(passwords);
    }
  };

  return (
    <SETTINGS_ACCOUNT_CONTAINER>

      <SINGLE_SETTING>
        <SETTING_NAME>User Name</SETTING_NAME>
        <INPUT_CONTAINER>
          <FormInput type="text" name="username" value={username} onChange={usernameChangeHandler} />
        </INPUT_CONTAINER>

        {
          dataUsername !== username && (
            <div>
              <Button onClick={usernameSubmitHandler}>Update Username</Button>
            </div>
          )
        }
      </SINGLE_SETTING>

      <SINGLE_SETTING>
        <SETTING_NAME>Email</SETTING_NAME>
        <INPUT_CONTAINER>
          <FormInput type="email" name="email" value={email} onChange={emailChangeHandler} />
        </INPUT_CONTAINER>

        {
          dataEmail !== email && (
            <div>
              <Button onClick={emailSubmitHandler}>Update Email</Button>
            </div>
          )
        }
      </SINGLE_SETTING>

      <SINGLE_SETTING>
        <SETTING_NAME>Change Password</SETTING_NAME>
        <PASSWORD_INPUT_GROUP>
          <FormInput type="password" name="newPassword" value={newPassword} onChange={passwordChangeHandler} placeholder="New Password" />
          <FormInput type="password" name="confirmPassword" value={confirmPassword} onChange={passwordChangeHandler} placeholder="Confirm Password" />
        </PASSWORD_INPUT_GROUP>

        {
          (newPassword && confirmPassword) && (
            <div>
              <Button onClick={passwordSubmitHandler}>Update Password</Button>
            </div>
          )
        }
      </SINGLE_SETTING>

    </SETTINGS_ACCOUNT_CONTAINER>
  );
};

export default SettingsAccount;