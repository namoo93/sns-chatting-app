import ContactsItem, {ContactsItemProps} from './ContactsItem';

type ContactsListProps = {
  data?: ContactsItemProps[];
  edit?: boolean;
  searchValue?: string;
};

export const ContactsList = ({data, edit, searchValue}: ContactsListProps) => {
  return (
    <div>
      {data?.map(item => {
        return (
          <ContactsItem
            edit={edit}
            id={item.id}
            name={item.name}
            first_name={item.first_name}
            last_name={item.last_name}
            uid={item.uid}
            profile_image={item.profile_image}
            block={item.block}
            birth={item.birth}
            video_able={item.video_able}
            call_able={item.call_able}
            is_favorite={item.is_favorite}
            is_mute={item.is_mute}
            searchValue={searchValue}
          />
        );
      })}
    </div>
  );
};
