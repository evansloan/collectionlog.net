import React from 'react';

import { FlexSection, LogButton, LogInput } from '@components/ui';
import { capitalize } from '@utils/format';

interface LogHeaderProps {
  data: any;
  errorMessage: string | null;
  onSearchHandler: (event: React.FormEvent, username: string) => void;
}

interface LogHeaderState {
  username: string;
}

class LogHeader extends React.Component<LogHeaderProps, LogHeaderState> {

  constructor(props: LogHeaderProps) {
    super(props);
    this.state = {
      username: '',
    };
  }

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  }

  render() {
    let username = this.props.data.username;
    if (username) {
      username = username.charAt(username.length - 1).toLowerCase() == 's' ? `${username}'` : `${username}'s`;
    }

    return (
      <FlexSection
        direction='flex-col lg:flex-row'
        justify='justify-start lg:justify-between'
        width='w-full'
        padding='p-0'
      >
        <form className='lg:w-[30%]' onSubmit={(e) => this.props.onSearchHandler(e, this.state.username)}>
          <LogInput
            className='h-[100%] w-[65%]'
            changeHandler={this.onUsernameChange}
            name='activeUser'
            placeholder='Enter username...'
            type='text'
          />
          <LogButton className='h-[100%] w-[35%] border-b-0 border-t-0' type='submit'>Search</LogButton>
        </form>
        <div className='m-[3px] grow page-title'>
          <h1>
            {this.props.data.accountType && this.props.data.accountType != 'NORMAL' &&
              <img
                className='inline-block w-[20px] mr-[5px] mt-[-10px] icon-shadow'
                src={`https://oldschool.runescape.wiki/images/${capitalize(this.props.data.accountType)}_chat_badge.png`}
              />
            }
            {username &&
              `${username} `
            }
            Collection Log
          </h1>
          <p className='m-0 text-[20px] text-orange text-shadow text-center font-bold'>
            Unique: <span className='text-white'>{this.props.data.unique} </span>
            Total: <span className='text-white'>{this.props.data.total}</span>
          </p>
        </div>
        {this.props.errorMessage ?
          <div className='lg:w-[30%] px-2 text-[20px] text-error text-center'>
            <p className='m-0'>{this.props.errorMessage}</p>
          </div>
          :
          <div className='spacer hidden lg:block'></div>
        }
      </FlexSection>
    );
  }
}

export default LogHeader;
