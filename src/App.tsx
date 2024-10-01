import MemecoinTable from './memecoin-table'
import { Address, Avatar, EthBalance, Identity, Name } from '@coinbase/onchainkit/identity'
import SwapComponents from './swap-widget'
import { ConnectWallet, ConnectWalletText, Wallet, WalletDropdown, WalletDropdownBasename, WalletDropdownDisconnect, WalletDropdownFundLink, WalletDropdownLink } from '@coinbase/onchainkit/wallet'
import { color } from '@coinbase/onchainkit/theme'

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Memecoin Dashboard</h1>

      <div className="mb-6">
        <Wallet>
          <ConnectWallet className='bg-blue-800'>
            <ConnectWalletText> Log In </ConnectWalletText>
            <Avatar className="h-6 w-6" />
            <Name className='text-white' />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address className={color.foregroundMuted} />
              <EthBalance />
            </Identity>
            <WalletDropdownBasename />
            <WalletDropdownLink className="hover:bg-blue-200" icon="wallet" href="https://keys.coinbase.com">Wallet</WalletDropdownLink>
            <WalletDropdownFundLink />
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Swap Widget</h2>
        <SwapComponents />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Top Memecoins</h2>
        <MemecoinTable />
      </div>
    </div>
  );
}

export default App
